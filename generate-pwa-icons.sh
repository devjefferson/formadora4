#!/bin/bash

# Script para gerar ícones PWA de diferentes tamanhos
# Requer ImageMagick instalado: brew install imagemagick

echo "🎨 Gerador de Ícones PWA"
echo "========================="
echo ""

# Verificar se ImageMagick está instalado
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick não encontrado!"
    echo ""
    echo "📦 Instalação:"
    echo "   macOS: brew install imagemagick"
    echo "   Ubuntu: sudo apt-get install imagemagick"
    echo "   Windows: https://imagemagick.org/script/download.php"
    echo ""
    exit 1
fi

# Solicitar arquivo de origem
read -p "📁 Caminho do ícone original (mínimo 512x512): " SOURCE_IMAGE

# Verificar se o arquivo existe
if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "❌ Arquivo não encontrado: $SOURCE_IMAGE"
    exit 1
fi

# Diretório de saída
OUTPUT_DIR="src/assets/icon"
mkdir -p "$OUTPUT_DIR"

# Tamanhos necessários para PWA
SIZES=(72 96 128 144 152 192 384 512)

echo ""
echo "🔄 Gerando ícones..."
echo ""

# Gerar cada tamanho
for SIZE in "${SIZES[@]}"; do
    OUTPUT_FILE="$OUTPUT_DIR/icon-${SIZE}x${SIZE}.png"
    convert "$SOURCE_IMAGE" -resize ${SIZE}x${SIZE} "$OUTPUT_FILE"
    
    if [ -f "$OUTPUT_FILE" ]; then
        echo "✅ Criado: icon-${SIZE}x${SIZE}.png"
    else
        echo "❌ Erro ao criar: icon-${SIZE}x${SIZE}.png"
    fi
done

echo ""
echo "✨ Ícones gerados com sucesso em: $OUTPUT_DIR"
echo ""
echo "📋 Próximos passos:"
echo "   1. Verifique os ícones gerados"
echo "   2. Execute: npm run build"
echo "   3. Faça deploy: vercel --prod"
echo ""

