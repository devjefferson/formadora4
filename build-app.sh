#!/bin/bash

# Script para build completo do aplicativo Android
# Uso: ./build-app.sh

echo "🚀 Iniciando build do aplicativo..."
echo ""

# Limpa o diretório www
echo "📦 Limpando build anterior..."
rm -rf www
echo "✅ Build anterior removido"
echo ""

# Build do Angular
echo "🔨 Compilando aplicativo Angular..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erro ao compilar o Angular"
    exit 1
fi
echo "✅ Aplicativo Angular compilado"
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

# Build debug do Android
echo "📱 Compilando APK debug..."
./gradlew assembleDebug
if [ $? -ne 0 ]; then
    echo "❌ Erro ao compilar APK"
    exit 1
fi
echo "✅ APK compilado com sucesso!"
echo ""

# Localiza o APK
APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    echo "📦 APK gerado em: android/$APK_PATH"
    echo ""
    echo "Para instalar no dispositivo conectado, execute:"
    echo "  adb install -r $APK_PATH"
else
    echo "⚠️  APK não encontrado no caminho esperado"
fi

cd ..
echo ""
echo "✅ Build concluído com sucesso!"

