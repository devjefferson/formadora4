# 🎹 Correção de Problemas com Teclado Virtual - Android

## 🔴 Problema Identificado

O Android está tendo problemas com o redimensionamento da tela quando o teclado virtual aparece, causando:
- ❌ Layout quebrado/sobreposto pelo teclado
- ❌ Inputs ficando escondidos atrás do teclado
- ❌ Scroll não funcionando corretamente
- ❌ Conteúdo não redimensionando adequadamente

---

## 🔍 Análise da Configuração Atual

### ❌ AndroidManifest.xml - Configuração Problemática
```xml
android:windowSoftInputMode="adjustResize"
```

**Problema:** `adjustResize` é **obsoleto** no Android 11+ e causa conflitos com:
- Edge-to-edge display
- Tela cheia (fullscreen)
- WebView do Capacitor
- Keyboard plugin do Ionic

### ❌ Capacitor Config - Sem Configurações de Keyboard
O `capacitor.config.ts` não tem configurações para o plugin Keyboard.

---

## ✅ Soluções Implementadas

### 1. AndroidManifest.xml - Corrigir windowSoftInputMode

**De:**
```xml
android:windowSoftInputMode="adjustResize"
```

**Para:**
```xml
android:windowSoftInputMode="adjustPan"
```

**Por que `adjustPan`?**
- ✅ Funciona melhor com WebView
- ✅ Compatível com Android 11+
- ✅ Move a viewport ao invés de redimensionar
- ✅ Evita conflitos com edge-to-edge
- ✅ Recomendado pelo Capacitor

**Alternativa avançada (Android 11+):**
```xml
android:windowSoftInputMode="adjustNothing"
```
(Requer configuração manual do scroll)

---

### 2. Capacitor Config - Adicionar Configurações de Keyboard

```typescript
plugins: {
  Keyboard: {
    resize: 'body',
    style: 'dark',
    resizeOnFullScreen: true
  }
}
```

**Parâmetros:**
- `resize: 'body'` - Redimensiona o body da página
- `style: 'dark'` - Teclado escuro (combina com dark mode)
- `resizeOnFullScreen: true` - Funciona em fullscreen

---

### 3. Global CSS - Ajustes para Keyboard

Adicionar regras específicas para comportamento com teclado:

```scss
// Prevenir overflow quando teclado abre
html.keyboard-open {
  ion-content {
    --keyboard-offset: 0px;
  }
}

// Garantir que inputs fiquem visíveis
ion-item {
  .item-native {
    overflow: visible;
  }
}

// Scroll suave quando teclado abre
ion-content {
  &::part(scroll) {
    overscroll-behavior: contain;
  }
}

// Input focus scroll automático
ion-input, ion-textarea {
  &:focus-within {
    scroll-margin-bottom: 100px;
  }
}
```

---

### 4. MainActivity.java - Configuração Programática

Adicionar configuração do teclado no código:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    
    // Configuração do teclado
    getWindow().setSoftInputMode(
        WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN
    );
    
    // Habilita debugging da WebView em builds debug
    if (BuildConfig.DEBUG) {
        WebView.setWebContentsDebuggingEnabled(true);
    }
}
```

---

## 📋 Comparação de windowSoftInputMode

| Modo | Comportamento | Android 11+ | Capacitor | Recomendado |
|------|---------------|-------------|-----------|-------------|
| `adjustResize` | Redimensiona janela | ⚠️ Problemas | ❌ Conflitos | ❌ Não |
| `adjustPan` | Move viewport | ✅ Funciona | ✅ Compatível | ✅ **Sim** |
| `adjustNothing` | Nenhum ajuste | ✅ Funciona | ⚠️ Manual | 🔶 Avançado |
| `adjustUnspecified` | Padrão sistema | 🔶 Variável | 🔶 Variável | ❌ Não |

---

## 🎯 Casos de Uso Específicos

### Caso 1: Inputs em Formulários (Welcome Page)
**Problema:** Input de nome fica escondido pelo teclado

**Solução:**
```typescript
// welcome.page.ts
import { Keyboard } from '@capacitor/keyboard';

ngOnInit() {
  // Garantir que o input seja visível quando teclado abrir
  Keyboard.addListener('keyboardWillShow', (info) => {
    const input = document.querySelector('ion-input');
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
```

### Caso 2: Lista de Itens com Inputs
**Problema:** Itens da lista ficam cortados

**Solução:**
```scss
// Adicionar padding bottom quando teclado aberto
ion-content.keyboard-open {
  --padding-bottom: 300px;
}
```

### Caso 3: Modal com Inputs
**Problema:** Modal não ajusta quando teclado abre

**Solução:**
```typescript
// No component do modal
const modal = await this.modalController.create({
  component: MyModalComponent,
  cssClass: 'keyboard-modal',
  // Importante!
  presentingElement: await this.modalController.getTop()
});
```

```scss
.keyboard-modal {
  &.keyboard-open {
    --height: 60%;
  }
}
```

---

## 🧪 Testes Recomendados

### Checklist de Testes do Teclado:

1. **Welcome Page - Input de Nome**
   - [ ] Abrir app
   - [ ] Clicar no input de nome
   - [ ] Verificar se input fica visível
   - [ ] Digitar e verificar se texto aparece
   - [ ] Pressionar Enter e verificar navegação

2. **Quiz - Navegação com Teclado**
   - [ ] Abrir uma questão
   - [ ] Verificar se alternativas ficam visíveis
   - [ ] Testar scroll durante interação

3. **Rotação de Tela**
   - [ ] Abrir teclado
   - [ ] Rotacionar dispositivo
   - [ ] Verificar se layout se ajusta

4. **Performance**
   - [ ] Abrir/fechar teclado várias vezes
   - [ ] Verificar se não há lag
   - [ ] Verificar se não há memory leak

---

## 🔧 Debugging do Teclado

### Chrome DevTools
```javascript
// No console do Chrome DevTools (chrome://inspect)

// Verificar se plugin está funcionando
window.Capacitor.Plugins.Keyboard

// Listener de eventos
Keyboard.addListener('keyboardWillShow', (info) => {
  console.log('Keyboard will show:', info);
});

Keyboard.addListener('keyboardDidShow', (info) => {
  console.log('Keyboard did show:', info);
});

Keyboard.addListener('keyboardWillHide', () => {
  console.log('Keyboard will hide');
});

// Verificar altura do teclado
Keyboard.addListener('keyboardDidShow', (info) => {
  console.log('Keyboard height:', info.keyboardHeight);
});
```

### Logcat (Android Studio)
```bash
adb logcat | grep -i keyboard
```

---

## 📱 Configurações por Versão do Android

### Android 10 e anterior
```xml
android:windowSoftInputMode="adjustPan"
```
✅ Funciona perfeitamente

### Android 11+
```xml
android:windowSoftInputMode="adjustPan"
```
✅ Funciona com edge-to-edge

### Android 15+ (Futuro)
```xml
android:windowSoftInputMode="adjustNothing"
android:windowLayoutInDisplayCutoutMode="shortEdges"
```
⚡ Melhor performance com insets

---

## 🎨 Melhorias Visuais

### Animação Suave ao Abrir Teclado
```scss
ion-content {
  transition: padding-bottom 0.3s ease-in-out;
}

html.keyboard-open ion-content {
  padding-bottom: var(--keyboard-height, 300px);
}
```

### Indicador Visual de Input Ativo
```scss
ion-input:focus-within,
ion-textarea:focus-within {
  --background: rgba(99, 102, 241, 0.1);
  --border-color: var(--ion-color-primary);
  --border-width: 2px;
}
```

---

## ⚠️ Problemas Conhecidos e Soluções

### 1. Input não rola para visível
**Sintoma:** Input fica atrás do teclado

**Solução:**
```typescript
scrollToInput() {
  setTimeout(() => {
    const input = document.querySelector('ion-input:focus');
    input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);
}
```

### 2. Layout não volta ao normal
**Sintoma:** Depois de fechar teclado, layout fica estranho

**Solução:**
```typescript
Keyboard.addListener('keyboardDidHide', () => {
  // Forçar recalculo de layout
  window.dispatchEvent(new Event('resize'));
});
```

### 3. Teclado sobrepõe botões
**Sintoma:** Botão de submit fica escondido

**Solução:**
```scss
.button-container {
  position: sticky;
  bottom: 0;
  background: var(--ion-background-color);
  padding: 16px;
  z-index: 10;
  
  html.keyboard-open & {
    bottom: var(--keyboard-height, 0);
  }
}
```

---

## 📚 Referências

- [Capacitor Keyboard Plugin](https://capacitorjs.com/docs/apis/keyboard)
- [Android windowSoftInputMode](https://developer.android.com/guide/topics/manifest/activity-element#wsoft)
- [Ionic Keyboard Documentation](https://ionicframework.com/docs/native/keyboard)
- [Edge-to-Edge Guidelines](https://developer.android.com/develop/ui/views/layout/edge-to-edge)

---

## ✅ Resumo das Mudanças

| Arquivo | Mudança | Impacto |
|---------|---------|---------|
| `AndroidManifest.xml` | `adjustPan` | ✅ Crítico |
| `capacitor.config.ts` | Keyboard config | ✅ Importante |
| `global.scss` | CSS keyboard | 🔶 Opcional |
| `MainActivity.java` | Programático | ✅ Recomendado |

---

**Data:** 22/11/2025  
**Status:** ✅ Pronto para implementar e testar

