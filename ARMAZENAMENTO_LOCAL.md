# 💾 Sistema de Armazenamento Local

## 📝 Como Funciona

O aplicativo agora salva o nome do usuário **permanentemente** no armazenamento local do dispositivo (localStorage). Isso significa que:

✅ **Primeira vez**: O usuário digita o nome e ele é salvo  
✅ **Próximas vezes**: O app vai direto para o quiz, sem pedir o nome novamente  
✅ **Persistência**: O nome fica salvo mesmo depois de fechar o navegador/app  

---

## 🔄 Fluxo de Navegação Atualizado

### Primeira Execução:
```
1. App inicia → Verifica localStorage
2. Não encontra nome → Mostra tela Welcome
3. Usuário digita nome → Salva no localStorage
4. Navega para o Quiz
```

### Execuções Seguintes:
```
1. App inicia → Verifica localStorage
2. Encontra nome → Redireciona automaticamente para o Quiz
3. Usuário faz o quiz normalmente
```

---

## 🎮 Opções de Trocar Usuário

### No Quiz:
- Clique no **chip com o nome** no canto superior direito do header
- Confirme a troca (o progresso atual será perdido)
- Vai para a tela Welcome para inserir novo nome

### Nos Resultados:
- Clique no botão **"Trocar de Usuário"**
- Vai para a tela Welcome para inserir novo nome

---

## 🛠️ Implementação Técnica

### 1. Serviço Quiz (quiz.service.ts)

#### Constante de Armazenamento:
```typescript
private readonly STORAGE_KEY = 'quiz_user_name';
```

#### Métodos Adicionados:

**`loadUserName()`** - Carrega nome do localStorage no construtor
```typescript
private loadUserName(): void {
  const savedName = localStorage.getItem(this.STORAGE_KEY);
  if (savedName) {
    this.userName = savedName;
  }
}
```

**`setUserName(name: string)`** - Salva no localStorage
```typescript
setUserName(name: string): void {
  this.userName = name;
  localStorage.setItem(this.STORAGE_KEY, name);
}
```

**`hasUserName()`** - Verifica se existe nome salvo
```typescript
hasUserName(): boolean {
  return !!this.userName || !!localStorage.getItem(this.STORAGE_KEY);
}
```

**`clearUserName()`** - Remove nome do localStorage
```typescript
clearUserName(): void {
  this.userName = '';
  localStorage.removeItem(this.STORAGE_KEY);
}
```

---

### 2. Página Welcome (welcome.page.ts)

#### Redirecionamento Automático:
```typescript
ngOnInit(): void {
  // Se já tem nome salvo, vai direto para o quiz
  if (this.quizService.hasUserName()) {
    this.router.navigate(['/quiz']);
  }
}
```

---

### 3. Página Quiz (quiz.page.ts)

#### Header com Nome do Usuário:
```html
<ion-chip slot="end" (click)="changeUser()">
  <ion-icon name="person-circle-outline"></ion-icon>
  <ion-label>{{ getUserName() }}</ion-label>
</ion-chip>
```

#### Alerta de Confirmação:
```typescript
async changeUser(): Promise<void> {
  const alert = await this.alertController.create({
    header: 'Trocar de Usuário',
    message: 'Tem certeza? O progresso do quiz atual será perdido.',
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      { 
        text: 'Sim, trocar',
        handler: () => {
          this.quizService.clearUserName();
          this.router.navigate(['/welcome']);
        }
      }
    ]
  });
  await alert.present();
}
```

---

### 4. Página Results (results.page.ts)

#### Botões Atualizados:
```typescript
goHome(): void {
  this.router.navigate(['/quiz']);  // Vai para novo quiz
}

changeUser(): void {
  this.quizService.clearUserName();
  this.router.navigate(['/welcome']);
}
```

---

## 🗂️ Onde os Dados Ficam Armazenados

### Navegador Web:
- **Chrome/Edge**: DevTools → Application → Local Storage
- **Firefox**: DevTools → Storage → Local Storage  
- **Safari**: DevTools → Storage → Local Storage

### Chave de Armazenamento:
```
quiz_user_name = "Nome do Usuário"
```

### Aplicativo Mobile (após build):
- **iOS**: NSUserDefaults (Capacitor Storage)
- **Android**: SharedPreferences (Capacitor Storage)

---

## 🧪 Como Testar

### Testar Primeira Vez:
1. Abra o DevTools (F12)
2. Vá em Application → Local Storage
3. Delete a chave `quiz_user_name`
4. Recarregue a página
5. A tela Welcome deve aparecer

### Testar Persistência:
1. Digite um nome e inicie o quiz
2. Feche a aba/navegador
3. Abra novamente o app
4. Deve ir direto para o quiz

### Testar Troca de Usuário:
1. No quiz, clique no chip com o nome no header
2. Confirme a troca
3. Deve voltar para a tela Welcome

---

## 🔒 Privacidade e Segurança

### O Que É Armazenado:
✅ **Apenas o nome** do usuário (texto simples)  
✅ **Não armazena** respostas do quiz  
✅ **Não armazena** pontuações  
✅ **Não envia** dados para nenhum servidor  

### Dados Temporários (apenas durante sessão):
- Pergunta atual
- Respostas da sessão atual
- Pontuação da sessão atual

**Estes dados são perdidos ao:**
- Recarregar a página
- Fazer novo quiz
- Trocar de usuário

---

## 🚀 Melhorias Futuras Possíveis

### Armazenamento Adicional:
- [ ] Histórico de pontuações
- [ ] Data/hora de cada tentativa
- [ ] Melhor desempenho por categoria
- [ ] Total de quizzes completados
- [ ] Conquistas desbloqueadas

### Exemplo de Estrutura:
```typescript
interface QuizHistory {
  userName: string;
  attempts: {
    date: Date;
    score: number;
    percentage: number;
    answers: boolean[];
  }[];
}
```

---

## 🛠️ Comandos Úteis para Debug

### Console do Navegador:

**Ver nome salvo:**
```javascript
localStorage.getItem('quiz_user_name')
```

**Salvar nome manualmente:**
```javascript
localStorage.setItem('quiz_user_name', 'Seu Nome')
```

**Limpar nome:**
```javascript
localStorage.removeItem('quiz_user_name')
```

**Limpar tudo:**
```javascript
localStorage.clear()
```

---

## ✅ Resumo das Mudanças

| Arquivo | Modificações |
|---------|-------------|
| `quiz.service.ts` | + métodos de localStorage (salvar, carregar, limpar) |
| `welcome.page.ts` | + redirecionamento automático se já tem nome |
| `quiz.page.ts` | + chip com nome no header + alerta para trocar |
| `quiz.page.html` | + chip no header com nome do usuário |
| `results.page.ts` | + método changeUser() |
| `results.page.html` | + botão "Trocar de Usuário" |

---

## 📱 Experiência do Usuário

### Primeira Vez:
1. **Abre o app** → Vê tela bonita de boas-vindas
2. **Digita nome** → Clica em "Iniciar Quiz"
3. **Faz o quiz** → Vê resultados

### Próximas Vezes:
1. **Abre o app** → Vai direto para o quiz 🚀
2. **Faz o quiz** → Vê resultados
3. **Quer trocar?** → Clica no nome ou no botão de trocar

---

**Resultado: Experiência mais fluida e personalizada! 🎉**

