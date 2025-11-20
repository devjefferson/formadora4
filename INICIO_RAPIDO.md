# 🚀 Início Rápido

## Executar o Aplicativo (3 passos simples)

### 1️⃣ Instalar Dependências
```bash
yarn install
```
ou
```bash
npm install
```

### 2️⃣ Iniciar o Servidor de Desenvolvimento
```bash
yarn start
```
ou
```bash
npm start
```

### 3️⃣ Abrir no Navegador
O aplicativo abrirá automaticamente em:
```
http://localhost:8100
```

---

## ⚡ Comandos Úteis

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
yarn start
ionic serve

# Build para produção
ionic build --prod

# Verificar erros
ng lint

# Executar testes
ng test
```

### Mobile

```bash
# Adicionar plataforma iOS
ionic cap add ios

# Adicionar plataforma Android
ionic cap add android

# Sincronizar código com plataformas nativas
ionic cap sync

# Abrir no Xcode (iOS)
ionic cap open ios

# Abrir no Android Studio
ionic cap open android
```

---

## 🎮 Como Testar

1. Abra `http://localhost:8100` no navegador
2. Digite seu nome na tela inicial
3. Clique em "Iniciar Quiz"
4. Responda as 15 perguntas
5. Veja seus resultados!

---

## 📱 Preview no Dispositivo

### Usando o navegador:
1. Execute `yarn start`
2. No seu celular, acesse o mesmo IP local
3. Exemplo: `http://192.168.1.100:8100`

### Usando Ionic Lab (visualização iOS/Android):
```bash
npm install -g @ionic/lab
ionic serve --lab
```

---

## ❓ Problemas Comuns

### Porta 8100 já em uso?
```bash
# Matar processo na porta 8100
lsof -ti:8100 | xargs kill -9

# Ou usar outra porta
ionic serve --port 8101
```

### Node modules corrompidos?
```bash
rm -rf node_modules
rm yarn.lock  # ou package-lock.json
yarn install  # ou npm install
```

### Erro de permissão no npm?
Use `yarn` ao invés de `npm` ou adicione `sudo` (não recomendado)

---

## 🎓 Estrutura das Páginas

```
/welcome  → Tela inicial (inserir nome)
/quiz     → Tela de perguntas
/results  → Tela de resultados
```

---

## 🌟 Pronto para começar!

Execute `yarn start` e comece a testar o quiz de ética digital! 🚀

Se tiver dúvidas, consulte o arquivo `README.md` para documentação completa.

