# Guia Visual do Aplicativo 📱

## 🎯 Fluxo de Navegação

```
┌──────────────────┐
│  Tela Welcome    │
│  (Inicial)       │
│  - Digite nome   │
│  - Ver temas     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Tela Quiz       │
│  (15 perguntas)  │
│  - Selecionar    │
│  - Ver feedback  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Tela Results    │
│  (Resultados)    │
│  - Ver pontuação │
│  - Refazer quiz  │
└──────────────────┘
```

## 📄 Tela 1: Welcome (Boas-vindas)

### Elementos:
- ✅ Ícone grande de escola (school-outline)
- ✅ Título "Bem-vindo!"
- ✅ Texto introdutório
- ✅ Lista de 6 temas com ícones:
  * 🛡️ Pirataria e uso ético de software
  * 📄 Direitos digitais e contratos virtuais
  * 👥 Inclusão digital e acessibilidade
  * 🌿 Sustentabilidade e lixo eletrônico
  * 🔒 Proteção de dados pessoais
  * 📰 Segurança da informação e LGPD
- ✅ Campo de input para nome
- ✅ Botão "Iniciar Quiz"

### Cores e Estilo:
- Card centralizado com fundo claro
- Botão primário grande e destacado
- Ícones coloridos para cada tema
- Layout responsivo

---

## 📝 Tela 2: Quiz (Perguntas)

### Elementos:
- ✅ Header com título e barra de progresso
- ✅ Chip mostrando número da pergunta (ex: "Pergunta 1 de 15")
- ✅ Chip com categoria da pergunta
- ✅ Texto da pergunta em destaque
- ✅ 4 opções de resposta em cards:
  * Letra identificadora (A, B, C, D)
  * Texto da opção
  * Feedback visual ao selecionar
- ✅ Botão "Confirmar Resposta"
- ✅ Card de explicação (após responder):
  * Verde se acertou ✓
  * Vermelho se errou ✗
  * Texto explicativo
- ✅ Botão "Próxima Pergunta" (após explicação)

### Feedback Visual:
- Opção selecionada: borda azul
- Resposta correta: borda verde + ícone de check
- Resposta incorreta: borda vermelha + ícone de X
- Animação suave ao mostrar explicação

---

## 🏆 Tela 3: Results (Resultados)

### Elementos:
- ✅ Ícone de troféu/medalha (varia com desempenho)
- ✅ Mensagem "Parabéns, [Nome]!"
- ✅ Card com mensagem de feedback colorido
- ✅ Círculo grande mostrando porcentagem
- ✅ 3 cards de estatísticas:
  * ✓ Acertos (verde)
  * ✗ Erros (vermelho)
  * ? Total (azul)
- ✅ Card com lista de categorias abordadas
- ✅ Botões de ação:
  * "Refazer Quiz"
  * "Compartilhar"
  * "Voltar ao Início"

### Animações:
- Ícone de troféu com bounce
- Círculo de pontuação com pulse
- Fade in da explicação

### Níveis de Performance:
```
≥ 90%  → 🏆 Troféu (Excelente!)
≥ 70%  → 🎖️ Medalha (Muito bem!)
≥ 50%  → 👍 Positivo (Bom trabalho!)
< 50%  → 📚 Estudo (Continue aprendendo!)
```

---

## 🎨 Paleta de Cores

### Cores Principais:
- **Primary**: Azul Ionic (--ion-color-primary)
- **Secondary**: Roxo/Rosa (--ion-color-secondary)
- **Success**: Verde para acertos
- **Danger**: Vermelho para erros
- **Warning**: Amarelo para avisos
- **Light**: Fundo claro dos cards

### Estados:
- **Normal**: Fundo branco/claro
- **Hover**: Elevação aumentada
- **Selecionado**: Borda azul + fundo levemente azulado
- **Correto**: Borda verde + fundo levemente verde
- **Incorreto**: Borda vermelha + fundo levemente vermelho

---

## 📐 Layout Responsivo

### Desktop (> 576px):
- Cards centralizados com max-width: 600-800px
- Fontes maiores e espaçamentos generosos
- Ícones grandes (80-100px)

### Mobile (≤ 576px):
- Cards ocupam largura total com padding
- Fontes ajustadas (menores)
- Ícones médios (60-80px)
- Botões e cards adaptados

---

## 🔄 Interações

### Welcome → Quiz:
1. Usuário digita nome
2. Botão fica habilitado
3. Click no botão → Navega para /quiz

### Quiz:
1. Usuário seleciona opção → Card fica destacado
2. Click em confirmar → Mostra feedback
3. Click em próxima → Carrega nova pergunta ou vai para resultados

### Results:
- "Refazer Quiz" → Volta para /quiz (reseta estado)
- "Compartilhar" → Abre dialog nativo ou copia texto
- "Voltar ao Início" → Vai para /welcome

---

## 📊 Dados do Quiz

### Categorias e Distribuição:
- Pirataria e uso ético: 2 perguntas (#1, #2)
- Direitos digitais: 2 perguntas (#3, #4)
- Inclusão digital: 2 perguntas (#5, #6)
- Sustentabilidade: 2 perguntas (#7, #8)
- Proteção de dados: 2 perguntas (#9, #10)
- Segurança e LGPD: 5 perguntas (#11-#15)

### Total: 15 perguntas

---

## 🎯 Critérios de Qualidade Atendidos

✅ Interface moderna e atraente  
✅ UX intuitiva e fluida  
✅ Feedback visual claro  
✅ Animações suaves  
✅ Design responsivo  
✅ Acessibilidade (ícones + texto)  
✅ Código organizado e componentizado  
✅ TypeScript com tipagem forte  
✅ Standalone components (Angular moderno)  
✅ Serviço centralizado para lógica  
✅ Navegação por rotas  
✅ Estado gerenciado no serviço  

---

## 🚀 Próximos Passos Possíveis

### Melhorias Futuras:
- [ ] Adicionar modo escuro
- [ ] Salvar histórico de tentativas
- [ ] Timer opcional para cada pergunta
- [ ] Ranking/Leaderboard
- [ ] Mais perguntas e dificuldades variadas
- [ ] Sons de feedback
- [ ] Badges/Conquistas
- [ ] Modo offline completo
- [ ] Testes unitários
- [ ] Testes E2E

### Recursos Avançados:
- [ ] Autenticação de usuários
- [ ] Backend para salvar progresso
- [ ] Análise de desempenho por categoria
- [ ] Gráficos de evolução
- [ ] Quiz adaptativo (dificuldade dinâmica)
- [ ] Modo multiplayer
- [ ] Integração com redes sociais

---

Desenvolvido com atenção aos detalhes e foco na experiência do usuário! 🎨✨

