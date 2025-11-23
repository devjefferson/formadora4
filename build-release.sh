#!/bin/bash

# Script para build de produção do aplicativo Android
# Uso: ./build-release.sh

set -e  # Para em caso de erro

echo "🚀 Iniciando build de PRODUÇÃO do aplicativo..."
echo ""

# Limpa o diretório www
echo "📦 Limpando build anterior..."
rm -rf www
echo "✅ Build anterior removido"
echo ""

# Build do Angular em modo produção
echo "🔨 Compilando aplicativo Angular (PRODUÇÃO)..."
npm run build -- --configuration production
if [ $? -ne 0 ]; then
    echo "❌ Erro ao compilar o Angular"
    exit 1
fi
echo "✅ Aplicativo Angular compilado em modo produção"
echo ""

# Sincroniza com Capacitor
echo "🔄 Sincronizando com Capacitor..."
npx cap sync android
if [ $? -ne 0 ]; then
    echo "❌ Erro ao sincronizar com Capacitor"
    exit 1
fi
echo "✅ Sincronização concluída"
echo ""

# Limpa o projeto Android
echo "🧹 Limpando projeto Android..."
cd android
./gradlew clean
if [ $? -ne 0 ]; then
    echo "❌ Erro ao limpar projeto Android"
    exit 1
fi
echo "✅ Projeto Android limpo"
echo ""

# Build release do Android
echo "📱 Compilando APK RELEASE..."
echo "⚠️  Nota: Este APK não está assinado digitalmente"
echo ""
./gradlew assembleRelease
if [ $? -ne 0 ]; then
    echo "❌ Erro ao compilar APK"
    exit 1
fi
echo "✅ APK release compilado com sucesso!"
echo ""

# Localiza o APK
APK_PATH="app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK_PATH" ]; then
    echo "📦 APK gerado em: android/$APK_PATH"
    
    # Mostra o tamanho do APK
    APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo "📊 Tamanho do APK: $APK_SIZE"
    echo ""
    
    echo "✅ APK assinado com chave DEBUG (pronto para testes)"
    echo ""
    echo "Para instalar no dispositivo conectado:"
    echo "  adb install -r $APK_PATH"
    echo ""
    echo "⚠️  NOTA: Para distribuição na Play Store, crie uma keystore própria"
else
    echo "⚠️  APK não encontrado no caminho esperado"
fi

cd ..
echo ""
echo "✅ Build de produção concluído com sucesso!"
echo ""
echo "📋 Próximos passos recomendados:"
echo "   1. Testar o APK em diferentes dispositivos"
echo "   2. Criar uma keystore para assinar o APK (para Play Store)"
echo "   3. Gerar um APK ou AAB assinado para distribuição oficial"

