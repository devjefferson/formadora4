#!/bin/bash

echo "🚀 BUILD E DEPLOY PARA VERCEL + PWA"
echo "===================================="
echo ""
echo "📦 Verificando dependências..."

# Verificar se tem node_modules
if [ ! -d "node_modules" ]; then
    echo "📥 Instalando dependências..."
    npm install
else
    echo "✅ Dependências já instaladas"
fi

echo ""
echo "🏗️  Iniciando build de produção..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build concluído com sucesso!"
    echo ""
    echo "📊 Tamanho do build:"
    du -sh www/
    echo ""
    echo "📁 Arquivos gerados:"
    ls -lh www/ | head -10
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎯 PRÓXIMOS PASSOS:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1️⃣  GERAR ÍCONES PWA:"
    echo "   Opção A (Online): https://www.pwabuilder.com/imageGenerator"
    echo "   Opção B (Script): ./generate-pwa-icons.sh"
    echo ""
    echo "2️⃣  TESTAR LOCALMENTE:"
    echo "   npx http-server www -p 8080"
    echo "   Abrir: http://localhost:8080"
    echo ""
    echo "3️⃣  DEPLOY NA VERCEL:"
    echo "   Opção A (Web): https://vercel.com/new"
    echo "   Opção B (CLI): npx vercel --prod"
    echo ""
    echo "📚 Ver guia completo: DEPLOY_PWA_VERCEL.md"
    echo ""
else
    echo ""
    echo "❌ Erro no build!"
    echo "Verifique os erros acima e tente novamente."
    echo ""
    exit 1
fi

