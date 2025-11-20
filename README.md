# Quiz de Ética Digital 🎓

Aplicativo de quiz desenvolvido com Ionic + Angular para testar conhecimentos sobre ética digital, incluindo temas importantes como LGPD, sustentabilidade digital, e muito mais.

## 📋 Temas Abordados

- **Pirataria e uso ético de software**: Questões sobre direitos autorais e uso legal de software
- **Direitos digitais e contratos virtuais**: Entendimento sobre termos de uso e contratos digitais
- **Inclusão digital e acessibilidade**: Importância da acessibilidade web
- **Sustentabilidade e lixo eletrônico**: Descarte correto e obsolescência programada
- **Proteção de dados pessoais**: Conceitos da LGPD e direitos dos titulares
- **Segurança da informação e LGPD**: Práticas de segurança e legislação brasileira

## 🚀 Funcionalidades

### Tela de Boas-vindas
- Inserção do nome do usuário (apenas na primeira vez)
- **Armazenamento local permanente** do nome
- Redirecionamento automático nas próximas vezes
- Apresentação visual dos temas do quiz
- Interface moderna e intuitiva

### Tela de Quiz
- 15 perguntas de múltipla escolha
- Navegação sequencial entre perguntas
- Feedback imediato após cada resposta
- Explicação detalhada para cada questão
- Barra de progresso
- Identificação da categoria de cada pergunta
- **Nome do usuário visível no header**
- **Opção de trocar usuário** a qualquer momento

### Tela de Resultados
- Pontuação final com porcentagem
- Estatísticas detalhadas (acertos, erros, total)
- Mensagem de feedback baseada no desempenho
- Opções para refazer o quiz ou compartilhar resultados
- Visualização das categorias abordadas
- **Botão para trocar de usuário**
- **Opção de fazer novo quiz** sem sair do app

## 🛠️ Tecnologias Utilizadas

- **Ionic Framework 8**: Framework para aplicativos móveis
- **Angular 18**: Framework JavaScript
- **TypeScript**: Linguagem de programação
- **SCSS**: Pré-processador CSS

## 📦 Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta do projeto
cd formadoraIV

# Instale as dependências
yarn install
# ou
npm install
```

## ▶️ Executando o Aplicativo

### Modo Desenvolvimento

```bash
# Usando Yarn
yarn start

# Usando NPM
npm start
```

O aplicativo estará disponível em `http://localhost:8100`

### Build para Produção

```bash
# Build otimizado
ionic build --prod
```

## 📱 Estrutura do Projeto

```
src/app/
├── services/
│   └── quiz.service.ts          # Serviço com lógica do quiz
├── welcome/
│   ├── welcome.page.ts          # Tela de boas-vindas
│   ├── welcome.page.html
│   └── welcome.page.scss
├── quiz/
│   ├── quiz.page.ts             # Tela do quiz
│   ├── quiz.page.html
│   └── quiz.page.scss
├── results/
│   ├── results.page.ts          # Tela de resultados
│   ├── results.page.html
│   └── results.page.scss
└── app.routes.ts                # Configuração de rotas
```

## 🎮 Como Usar

1. **Primeira Vez**: 
   - Digite seu nome na tela de boas-vindas
   - Clique em "Iniciar Quiz"
   - Seu nome será salvo automaticamente! 💾

2. **Próximas Vezes**: 
   - O app vai direto para o quiz! 🚀
   - Seu nome aparece no header
   - Clique no nome para trocar de usuário, se necessário

3. **Quiz**: 
   - Leia cada pergunta cuidadosamente
   - Selecione uma das quatro opções
   - Clique em "Confirmar Resposta"
   - Leia a explicação fornecida
   - Clique em "Próxima Pergunta" para continuar

4. **Resultados**:
   - Visualize sua pontuação final
   - Analise suas estatísticas
   - Opcionalmente:
     - Refaça o quiz
     - Compartilhe seus resultados
     - Troque de usuário
     - Faça um novo quiz

## 🎨 Design

O aplicativo foi desenvolvido com foco em:
- **UX moderna**: Interface limpa e intuitiva
- **Responsividade**: Funciona bem em diferentes tamanhos de tela
- **Feedback visual**: Cores e ícones para melhor comunicação
- **Acessibilidade**: Seguindo boas práticas de design inclusivo

## 📊 Sistema de Pontuação

- **90% ou mais**: Excelente! Você domina o assunto! 🏆
- **70-89%**: Muito bem! Bom conhecimento! 🎖️
- **50-69%**: Bom trabalho! Continue estudando! 👍
- **Menos de 50%**: Continue aprendendo! Você vai melhorar! 📚

## 🔒 Privacidade

Este aplicativo **não coleta, armazena ou transmite dados pessoais para servidores externos**. 

### O que é armazenado localmente:
- ✅ **Nome do usuário** (localStorage do navegador)
- ✅ **Apenas no seu dispositivo**
- ✅ **Pode ser removido** a qualquer momento

### O que NÃO é armazenado:
- ❌ Respostas do quiz
- ❌ Pontuações históricas
- ❌ Dados pessoais sensíveis
- ❌ Nada é enviado para servidores

**Para limpar seus dados:** Clique em "Trocar de Usuário" ou limpe o localStorage do navegador.

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

## 👨‍💻 Desenvolvimento

Para adicionar novas perguntas, edite o arquivo `src/app/services/quiz.service.ts` e adicione novos objetos no array `questions`.

Estrutura de uma pergunta:

```typescript
{
  id: number,
  category: string,
  question: string,
  options: string[],
  correctAnswer: number,  // índice da resposta correta (0-3)
  explanation: string
}
```

## 🐛 Encontrou um bug?

Reporte problemas ou sugestões através das issues do repositório.

---

Desenvolvido com ❤️ para promover o conhecimento sobre ética digital e LGPD.

