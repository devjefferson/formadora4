# 🚀 Deploy na Vercel + PWA

## 📋 Checklist Completo

### ✅ Arquivos já criados:
- ✅ `manifest.webmanifest` - Configuração do PWA
- ✅ `vercel.json` - Configuração do deploy Vercel
- ✅ `ngsw-config.json` - Service Worker Angular
- ✅ `.vercelignore` - Arquivos a ignorar no deploy
- ✅ `index.html` atualizado com meta tags PWA
- ✅ `angular.json` configurado para incluir manifest
- ✅ `package.json` com script de build atualizado

---

## 🎨 PASSO 1: Gerar Ícones PWA

Você precisa criar ícones PWA nos seguintes tamanhos:
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

### Opção A: Usar ferramenta online (Recomendado) 🌐
1. Acesse: https://www.pwabuilder.com/imageGenerator
2. Faça upload de um ícone quadrado (mínimo 512x512)
3. Baixe o ZIP com todos os tamanhos
4. Extraia os arquivos na pasta `src/assets/icon/`

### Opção B: Usar pwa-asset-generator (Linha de comando) 💻
```bash
# Instalar a ferramenta
npm install -g pwa-asset-generator

# Gerar ícones (use uma imagem de 512x512 ou maior)
pwa-asset-generator src/assets/icon/seu-icone-original.png src/assets/icon/ --icon-only --type png
```

### Opção C: Manualmente com Photoshop/GIMP/Figma
Redimensione seu logo para cada tamanho e salve como:
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

---

## 🔨 PASSO 2: Build Local (Teste antes de fazer deploy)

```bash
# Build de produção
npm run build

# OU build específico para PWA
npm run build:pwa

# Testar localmente (opcional)
npx http-server www -p 8080
```

Abra `http://localhost:8080` e teste se está tudo funcionando.

---

## 🌐 PASSO 3: Deploy na Vercel

### Opção A: Via Interface Web (Mais fácil) 🖱️

1. **Criar conta na Vercel**
   - Acesse: https://vercel.com
   - Faça login com GitHub/GitLab/Bitbucket

2. **Importar Projeto**
   - Clique em "Add New..." → "Project"
   - Conecte seu repositório Git
   - Selecione este repositório

3. **Configurar Build**
   - Framework Preset: **Other**
   - Build Command: `npm run build`
   - Output Directory: `www`
   - Install Command: `npm install`

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build finalizar (3-5 minutos)
   - Seu app estará online! 🎉

### Opção B: Via CLI (Mais rápido) ⚡

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login na Vercel
vercel login

# Deploy
vercel

# Seguir as instruções:
# - Set up and deploy? → Yes
# - Which scope? → Sua conta
# - Link to existing project? → No
# - What's your project's name? → formadora-iv
# - In which directory is your code located? → ./
# - Want to override settings? → No

# Deploy em produção
vercel --prod
```

---

## 🔍 PASSO 4: Verificar se o PWA está funcionando

1. **Abra o site no Chrome/Edge**
2. **Pressione F12** (DevTools)
3. **Vá para a aba "Application"**
4. **Verifique:**
   - ✅ Manifest: deve mostrar o nome, ícones, cores
   - ✅ Service Workers: deve estar registrado
   - ✅ Offline: desative a rede e teste se funciona

5. **Instalar o PWA:**
   - No Chrome/Edge, clique no ícone de "+" na barra de endereços
   - Ou vá em Menu → "Instalar app"

---

## 📱 PASSO 5: Testar no celular

1. Abra o site no Chrome (Android) ou Safari (iOS)
2. **Android:** Menu → "Adicionar à tela inicial"
3. **iOS:** Botão de compartilhar → "Adicionar à tela de início"
4. O app deve abrir em tela cheia, sem barra do navegador

---

## ⚙️ Configurações Avançadas (Opcional)

### Domínio Personalizado
1. Na Vercel, vá em "Settings" → "Domains"
2. Adicione seu domínio personalizado
3. Configure o DNS conforme instruções

### Variáveis de Ambiente
1. Na Vercel, vá em "Settings" → "Environment Variables"
2. Adicione suas variáveis (API keys, etc.)
3. Rebuild o projeto

### Habilitar HTTPS
- ✅ Já vem habilitado automaticamente na Vercel!

---

## 🐛 Solução de Problemas

### Erro: "Build failed"
- Verifique se todas as dependências estão no `package.json`
- Rode `npm install` localmente e teste o build

### PWA não aparece para instalar
- Certifique-se de que está em HTTPS
- Verifique se o manifest está sendo servido corretamente
- Confira se os ícones existem nas pastas corretas

### Service Worker não registra
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Verifique o console por erros
- Certifique-se de que está em HTTPS

### Ícones não aparecem
- Verifique os nomes dos arquivos (devem ser exatos)
- Confirme que estão em `src/assets/icon/`
- Rebuild o projeto

---

## 📊 Monitoramento

### Vercel Analytics (Grátis)
1. Na Vercel, ative "Analytics" nas configurações
2. Veja estatísticas de acesso, performance, etc.

### Lighthouse Score
1. Abra DevTools → Aba "Lighthouse"
2. Execute auditoria PWA
3. Meta: 90+ pontos em todas as categorias

---

## 🔄 Updates Automáticos

Toda vez que você fizer `git push` para a branch `main`:
1. Vercel detecta automaticamente
2. Faz build e deploy automaticamente
3. Atualiza o site em produção

**Branches de feature:**
- Cada branch gera uma preview URL única
- Teste antes de mergear para main

---

## 🎯 Resumo Rápido

```bash
# 1. Gerar ícones (use ferramenta online)

# 2. Build local
npm run build

# 3. Deploy Vercel
vercel --prod

# 4. Testar PWA no navegador

# 5. Celebrar! 🎉
```

---

## 📚 Links Úteis

- [Vercel Docs](https://vercel.com/docs)
- [PWA Builder](https://www.pwabuilder.com/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web.dev PWA](https://web.dev/progressive-web-apps/)
- [Ionic PWA](https://ionicframework.com/docs/angular/pwa)

---

## 🆘 Precisa de Ajuda?

Se encontrar problemas:
1. Verifique os logs na Vercel (aba "Deployments")
2. Rode `npm run build` localmente para ver erros
3. Confira o console do navegador (F12)
4. Verifique se todos os arquivos foram criados corretamente

**Boa sorte com o deploy! 🚀**

