# Configuração do Build - Formadora IV

## 📋 Resumo das Configurações Realizadas

Este documento descreve todas as configurações realizadas para otimizar o build do aplicativo.

---

## ✅ Mudanças Implementadas

### 1. Capacitor Config (`capacitor.config.ts`)

**Antes:**
- App ID genérico: `io.ionic.starter`
- Nome: `formadoraIV`
- Configurações inseguras habilitadas

**Depois:**
- **App ID único:** `com.faculdade.formadora`
- **Nome formatado:** `Formadora IV`
- **Segurança melhorada:**
  - `cleartext: false` (HTTPS obrigatório)
  - `allowMixedContent: false` (conteúdo misto bloqueado)
- **Splash Screen configurado** com customização

### 2. Android Build Gradle (`android/app/build.gradle`)

**Atualizações:**
- **Namespace:** `com.faculdade.formadora`
- **Application ID:** `com.faculdade.formadora`
- **Version Name:** `1.0.0` (formatação adequada)

**Build Types Otimizados:**

#### Debug:
```gradle
debug {
    minifyEnabled false
    debuggable true
}
```

#### Release:
```gradle
release {
    minifyEnabled true          // Minificação habilitada
    shrinkResources true        // Remoção de recursos não usados
    proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
}
```

### 3. ProGuard Rules (`proguard-rules.pro`)

**Regras adicionadas:**
- ✅ Preservação de classes do Capacitor
- ✅ Proteção de plugins do Capacitor
- ✅ Manutenção de interfaces JavaScript
- ✅ Otimizações para WebView
- ✅ Remoção de logs em produção
- ✅ Preservação de métodos nativos
- ✅ Otimização com 5 passes
- ✅ Limpeza de logs de debug/verbose/info

### 4. Gradle Properties (`android/gradle.properties`)

**Otimizações de Performance:**
```properties
org.gradle.jvmargs=-Xmx2048m       # Aumentado de 1536m para 2048m
org.gradle.parallel=true            # Build paralelo habilitado
org.gradle.configureondemand=true   # Configuração sob demanda
org.gradle.caching=true             # Cache habilitado

# Otimizações Android
android.enableR8.fullMode=true      # R8 em modo completo
android.nonTransitiveRClass=true    # R class não transitiva
android.nonFinalResIds=false        # IDs de recursos finais
```

### 5. Estrutura de Pacotes Java

**Antes:**
```
android/app/src/main/java/io/ionic/starter/MainActivity.java
```

**Depois:**
```
android/app/src/main/java/com/faculdade/formadora/MainActivity.java
```

### 6. Strings XML (`android/app/src/main/res/values/strings.xml`)

Todos os identificadores atualizados para refletir o novo App ID:
- `app_name`: "Formadora IV"
- `package_name`: "com.faculdade.formadora"
- `custom_url_scheme`: "com.faculdade.formadora"

---

## 🚀 Scripts de Build

### Build Debug (`build-app.sh`)
```bash
./build-app.sh
```

**O que faz:**
1. Limpa o diretório `www`
2. Compila o Angular
3. Sincroniza com Capacitor
4. Limpa o projeto Android
5. Gera APK debug (assinado com debug key)

**Output:** `android/app/build/outputs/apk/debug/app-debug.apk`

### Build Release (`build-release.sh`) ⭐
```bash
./build-release.sh
```

**O que faz:**
1. Limpa o diretório `www`
2. Compila o Angular em **modo produção** (otimizado)
3. Sincroniza com Capacitor
4. Limpa o projeto Android
5. Gera APK release otimizado (não assinado)

**Output:** `android/app/build/outputs/apk/release/app-release-unsigned.apk`
**Tamanho:** ~2.9 MB

---

## 📊 Benefícios das Otimizações

### Performance
- ✅ **Minificação** reduz o tamanho do código
- ✅ **Shrink Resources** remove recursos não utilizados
- ✅ **R8 Full Mode** otimização máxima de bytecode
- ✅ **Build Paralelo** acelera a compilação
- ✅ **Cache Gradle** reutiliza resultados anteriores

### Segurança
- ✅ **HTTPS obrigatório** (androidScheme: 'https')
- ✅ **Bloqueio de conteúdo misto**
- ✅ **Logs removidos** em produção
- ✅ **Código ofuscado** (ProGuard)

### Tamanho
- 📦 APK otimizado: **~2.9 MB**
- 🗜️ Redução significativa com minificação
- 🧹 Recursos não utilizados removidos

---

## 🔐 Assinatura de APK (Para Distribuição)

### Para distribuir na Google Play Store ou publicamente:

#### 1. Criar uma Keystore

```bash
keytool -genkey -v -keystore formadora-release.keystore -alias formadora -keyalg RSA -keysize 2048 -validity 10000
```

#### 2. Configurar no `build.gradle`

Adicione no arquivo `android/app/build.gradle`:

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file("path/to/formadora-release.keystore")
            storePassword "sua-senha-store"
            keyAlias "formadora"
            keyPassword "sua-senha-key"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            ...
        }
    }
}
```

#### 3. Gerar APK Assinado

```bash
cd android
./gradlew assembleRelease
```

O APK assinado estará em:
```
android/app/build/outputs/apk/release/app-release.apk
```

### Ou gerar AAB (Android App Bundle) - Recomendado para Play Store

```bash
cd android
./gradlew bundleRelease
```

O AAB estará em:
```
android/app/build/outputs/bundle/release/app-release.aab
```

---

## 🧪 Testando o APK

### Instalar via ADB

```bash
# APK Debug
adb install -r android/app/build/outputs/apk/debug/app-debug.apk

# APK Release
adb install -r android/app/build/outputs/apk/release/app-release-unsigned.apk
```

### Verificar Informações do APK

```bash
# Ver informações do package
aapt dump badging android/app/build/outputs/apk/release/app-release-unsigned.apk

# Ver tamanho
du -h android/app/build/outputs/apk/release/app-release-unsigned.apk
```

---

## 📝 Notas Importantes

### ⚠️ APK Release Não Assinado
O APK gerado por `build-release.sh` **não está assinado digitalmente**. Isto significa:
- ✅ Pode ser instalado para testes
- ❌ Alguns dispositivos podem bloquear a instalação
- ❌ Não pode ser publicado na Play Store
- ❌ Não pode ser atualizado (precisa desinstalar primeiro)

### ✅ Para Distribuição Oficial
1. **Crie uma keystore** (veja seção acima)
2. **Configure signing no Gradle**
3. **Gere um AAB** (recomendado) ou APK assinado
4. **Teste em múltiplos dispositivos**
5. **Publique na Play Store** ou distribua

### 📱 Compatibilidade
- **Mínimo:** Android 6.0 (API 23)
- **Alvo:** Android 14 (API 35)
- **Compilação:** SDK 35

---

## 🔄 Fluxo de Desenvolvimento Recomendado

### Durante o Desenvolvimento
```bash
ionic serve          # Desenvolvimento no navegador
ionic cap run android --livereload  # Desenvolvimento no dispositivo
```

### Para Testar Builds
```bash
./build-app.sh      # Gera APK debug para testes rápidos
```

### Para Produção
```bash
./build-release.sh   # Gera APK otimizado para validação final
# Depois configure keystore e gere build assinado
```

---

## 📚 Referências

- [Capacitor Configuration](https://capacitorjs.com/docs/config)
- [Android Gradle Plugin](https://developer.android.com/studio/build)
- [ProGuard Rules](https://developer.android.com/studio/build/shrink-code)
- [App Signing](https://developer.android.com/studio/publish/app-signing)

---

**Data da última atualização:** 22/11/2025
**Versão do App:** 1.0.0
**Build Tools:** Gradle 8.7.2, Capacitor 7.4.4

