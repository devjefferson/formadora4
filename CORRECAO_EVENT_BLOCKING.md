# 🎯 Correção de Event Blocking e Layout - Android

## 🔴 Problemas Identificados

### 1. **Event Blocking por CSS**
Encontrados elementos que podem bloquear eventos de clique/toque:

#### `home.page.scss`
```scss
.card-background {
  position: absolute;
  inset: 0;
  pointer-events: none;  // ✅ Correto, mas pode causar problemas
  z-index: 1;  // ❌ PROBLEMA: Z-index baixo pode ser sobreposto
}

ion-card-content {
  z-index: 1;  // ❌ PROBLEMA: Mesmo z-index que background
}
```

#### `quiz.page.scss`
```scss
.progress-text {
  position: absolute;  // ⚠️ Pode bloquear elementos abaixo
  z-index: (não definido)  // ❌ PROBLEMA: Sem z-index explícito
}
```

#### `results.page.scss` e outros
Múltiplos elementos com `position: absolute` sem z-index ou pointer-events definidos.

---

## 🔧 Correções Aplicadas

### 1. **Fix Z-index Hierarchy**

Estabelecer hierarquia clara de z-index em toda a aplicação:

```scss
// Hierarquia de Z-index Global
$z-index-background: -1;
$z-index-base: 1;
$z-index-decoration: 2;
$z-index-content: 10;
$z-index-interactive: 20;
$z-index-header: 100;
$z-index-overlay: 1000;
$z-index-modal: 2000;
$z-index-toast: 3000;
```

### 2. **Garantir Pointer Events Corretos**

Elementos decorativos devem ter `pointer-events: none`:
```scss
.decoration-element {
  pointer-events: none;  // Não bloqueia cliques
  z-index: -1;  // Atrás do conteúdo
}
```

Elementos interativos devem ter `pointer-events: auto`:
```scss
.clickable-element {
  pointer-events: auto;  // Aceita cliques
  z-index: 20;  // Acima de conteúdo estático
  cursor: pointer;  // Indicação visual
}
```

### 3. **Ion-content Configurações**

```scss
ion-content {
  // Garantir que conteúdo seja rolável
  --overflow: auto;
  
  // Garantir touch events funcionem
  touch-action: pan-y;
  
  // Z-index adequado
  z-index: 1;
  position: relative;
}
```

### 4. **Inputs e Botões**

```scss
ion-input, ion-textarea, ion-button {
  // Garantir que recebam eventos
  pointer-events: auto;
  z-index: 20;
  position: relative;
  
  // Touch target adequado (mínimo 44x44px)
  min-height: 44px;
  min-width: 44px;
}
```

---

## 📋 Checklist de Problemas Comuns

### Event Blocking
- [ ] Elementos com `position: absolute` têm `pointer-events` definido
- [ ] Z-index está em hierarquia lógica
- [ ] Elementos decorativos têm `pointer-events: none`
- [ ] Inputs/botões têm `pointer-events: auto`

### Layout
- [ ] Ion-content tem `overflow` apropriado
- [ ] Não há elementos fixos cobrindo inputs
- [ ] Touch targets têm mínimo 44x44px
- [ ] Elementos interativos têm `cursor: pointer`

### Teclado
- [ ] Inputs estão dentro de ion-content rolável
- [ ] windowSoftInputMode é `adjustPan`
- [ ] Keyboard plugin configurado no Capacitor

---

## 🔍 Problemas Específicos por Página

### Welcome Page ✅ OK
- Input está corretamente dentro de ion-content
- Sem elementos blocking
- Z-index adequado

### Home Page ⚠️ ATENÇÃO
**Problemas:**
1. `.card-background` com `position: absolute` e z-index baixo
2. `ion-card-content` sem z-index adequado
3. Cards podem não registrar cliques em alguns casos

**Correção:**
```scss
.card-background {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;  // ✅ Mantém
  z-index: -1;  // ✅ Muda para trás do conteúdo
}

ion-card-content {
  position: relative;  // ✅ Adiciona
  z-index: 10;  // ✅ Aumenta
  pointer-events: auto;  // ✅ Adiciona
}

.menu-card {
  cursor: pointer;
  pointer-events: auto;  // ✅ Garante cliques
  
  &:hover {
    // Efeitos visuais
  }
}
```

### Quiz Page ⚠️ ATENÇÃO
**Problemas:**
1. `.progress-text` com `position: absolute` sem z-index
2. Options cards podem não registrar cliques corretamente

**Correção:**
```scss
.progress-text {
  position: absolute;
  pointer-events: none;  // ✅ Não bloqueia toolbar
  z-index: 1;  // ✅ Adiciona
}

.option-card {
  cursor: pointer;
  pointer-events: auto;  // ✅ Garante cliques
  position: relative;  // ✅ Cria contexto de empilhamento
  z-index: 10;  // ✅ Acima de outros elementos
  
  &.disabled {
    pointer-events: none;  // ✅ Desabilita quando necessário
  }
}
```

### Statistics Page ⚠️ ATENÇÃO
**Problema:**
- Múltiplos elementos com `position: absolute`

**Correção:**
```scss
// Decorações e ícones
.stat-icon, .decoration {
  pointer-events: none;
  z-index: 1;
}

// Conteúdo interativo
.stat-card, ion-button {
  pointer-events: auto;
  z-index: 10;
  cursor: pointer;
}
```

### Hangman Page ⚠️ CRÍTICO
**Problemas:**
10+ elementos com `position: absolute` sem pointer-events definido!

**Correção:**
```scss
// Partes decorativas do boneco
.hangman-part {
  position: absolute;
  pointer-events: none;  // ✅ Não bloqueia cliques
  z-index: 1;
}

// Letras clicáveis
.letter-button {
  pointer-events: auto;  // ✅ Aceita cliques
  z-index: 20;
  cursor: pointer;
  
  &.used {
    pointer-events: none;  // ✅ Desabilita usadas
  }
}
```

---

## 🛠️ Correções Globais no global.scss

```scss
/**
 * Garantir Event Handling Correto
 * -----------------------------------------------------
 */

// Garantir que ion-content seja sempre rolável
ion-content {
  --overflow: auto;
  touch-action: pan-y;
  position: relative;
  z-index: 1;
}

// Inputs e elementos interativos
ion-input, 
ion-textarea, 
ion-button,
ion-item[button] {
  pointer-events: auto !important;
  position: relative;
  z-index: 20;
  
  // Touch target mínimo (acessibilidade)
  min-height: 44px;
  
  &[disabled] {
    pointer-events: none;
  }
}

// Cards clicáveis
ion-card[button],
.clickable {
  pointer-events: auto;
  cursor: pointer;
  position: relative;
  z-index: 10;
}

// Elementos decorativos
.decoration,
.background-pattern,
[class*="-background"],
[class*="-decoration"] {
  pointer-events: none;
  z-index: -1;
}

// Overlays e modais
ion-modal,
ion-popover,
ion-alert,
ion-toast {
  z-index: 2000;
}

// Headers fixos
ion-header {
  z-index: 100;
}

// Garantir que elementos absolute não bloqueiem
[style*="position: absolute"] {
  &:not(ion-input):not(ion-button):not(ion-item) {
    pointer-events: none;
  }
}
```

---

## 🧪 Testes Recomendados

### Teste 1: Cliques em Cards (Home)
```
1. Abrir Home page
2. Clicar em cada card (Quiz, Forca, Estatísticas)
3. Verificar se navegação funciona
4. Testar em diferentes áreas do card
```

### Teste 2: Inputs (Welcome)
```
1. Abrir Welcome page
2. Clicar no input de nome
3. Digitar texto
4. Clicar no botão "Iniciar Jornada"
5. Verificar navegação
```

### Teste 3: Options do Quiz
```
1. Iniciar um quiz
2. Clicar em cada alternativa
3. Verificar feedback visual
4. Testar botão "Próxima"
```

### Teste 4: Letras do Hangman
```
1. Abrir jogo da forca
2. Clicar em várias letras
3. Verificar se todas respondem
4. Testar em cantos e bordas das letras
```

### Teste 5: Com Teclado Virtual
```
1. Abrir Welcome page
2. Focar no input (teclado abre)
3. Tentar clicar em outros elementos
4. Verificar se cliques funcionam
5. Fechar teclado e testar novamente
```

---

## 🔧 Debug de Event Blocking

### Chrome DevTools (chrome://inspect)

```javascript
// Verificar qual elemento está recebendo o clique
document.addEventListener('click', function(e) {
  console.log('Clicked element:', e.target);
  console.log('Z-index:', window.getComputedStyle(e.target).zIndex);
  console.log('Pointer events:', window.getComputedStyle(e.target).pointerEvents);
  console.log('Position:', window.getComputedStyle(e.target).position);
}, true);

// Encontrar elemento no ponto de clique
document.addEventListener('click', function(e) {
  const element = document.elementFromPoint(e.clientX, e.clientY);
  console.log('Element at click point:', element);
}, true);

// Verificar elementos bloqueando
function checkBlocking(selector) {
  const el = document.querySelector(selector);
  const rect = el.getBoundingClientRect();
  const center = document.elementFromPoint(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2
  );
  
  if (center !== el) {
    console.warn('Element is blocked by:', center);
  } else {
    console.log('Element is clickable');
  }
}

// Uso
checkBlocking('ion-input');
checkBlocking('.menu-card');
checkBlocking('.option-card');
```

### Logcat (Android)

```bash
# Ver eventos de toque
adb logcat | grep -i "touch\|click\|motion"

# Ver se eventos estão sendo bloqueados
adb logcat | grep -i "eventdispatcher"
```

---

## 📊 Resumo de Correções

| Página | Problema | Correção | Prioridade |
|--------|----------|----------|------------|
| Home | Z-index card-background | Mudar para -1 | 🔴 Alta |
| Home | ion-card-content sem z-index | Adicionar z-index: 10 | 🔴 Alta |
| Quiz | progress-text sem pointer-events | Adicionar pointer-events: none | 🟡 Média |
| Quiz | option-card sem z-index explícito | Adicionar z-index: 10 | 🟡 Média |
| Hangman | 10+ absolute sem pointer-events | Adicionar pointer-events: none | 🔴 Alta |
| Statistics | Elementos absolute mal configurados | Revisar z-index e pointer-events | 🟡 Média |
| Global | Falta hierarquia de z-index | Criar sistema de z-index | 🔴 Alta |

---

## ✅ Validação Final

Depois de aplicar todas as correções, validar:

- [ ] Todos os botões são clicáveis
- [ ] Todos os inputs aceitam foco
- [ ] Cards navegam corretamente
- [ ] Teclado não bloqueia elementos
- [ ] Não há elementos invisíveis bloqueando
- [ ] Touch targets têm tamanho adequado (44x44px mín)
- [ ] Cursor muda para pointer em elementos clicáveis
- [ ] Elementos disabled não aceitam cliques

---

**Data:** 22/11/2025  
**Status:** 🔴 Crítico - Aplicar correções antes de distribuir  
**Impacto:** Alto - Pode impedir uso do app

