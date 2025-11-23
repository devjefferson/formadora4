# 🔐 Guia de Assinatura de APKs - Formadora IV

## 📝 Por que assinar APKs?

O Android **exige** que todos os APKs sejam assinados digitalmente antes da instalação. Isso garante:
- ✅ Autenticidade do aplicativo
- ✅ Integridade dos arquivos
- ✅ Proteção contra modificações
- ✅ Identificação do desenvolvedor

---

## 🔑 Tipos de Assinatura

### 1. Debug Key (Desenvolvimento)
**Uso:** Desenvolvimento e testes internos  
**Local:** `~/.android/debug.keystore`  
**Criada automaticamente** pelo Android SDK

**Características:**
- ✅ Não precisa de senha
- ✅ Gerada automaticamente
- ✅ Perfeita para testes
- ❌ **NÃO pode ser usada na Play Store**
- ❌ Expira após 1 ano (mas é recriada)

### 2. Release Key (Produção)
**Uso:** Distribuição pública e Play Store  
**Local:** Você cria e guarda com segurança

**Características:**
- ✅ Senha protegida
- ✅ Você controla
- ✅ **Necessária para Play Store**
- ✅ Válida por muitos anos
- ⚠️ **NUNCA perca esta keystore!**

---

## 🛠️ Configuração Atual

### Build Debug (`./build-app.sh`)
```gradle
debug {
    minifyEnabled false
    debuggable true
    signingConfig signingConfigs.debug  // Usa debug key automática
}
```

### Build Release (`./build-release.sh`)
```gradle
release {
    minifyEnabled true
    shrinkResources true
    proguardFiles ...
    signingConfig signingConfigs.debug  // ✅ Usa debug key para testes
}
```

**Status Atual:** O build release está configurado para usar a **chave debug** para facilitar os testes.

---

## 🚀 Como Criar uma Keystore de Produção

### Passo 1: Criar a Keystore

```bash
keytool -genkey -v \
  -keystore ~/formadora-release.keystore \
  -alias formadora \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**Informações solicitadas:**
- Password da keystore (guarde bem!)
- Password da key (pode ser igual)
- Nome completo
- Unidade organizacional
- Organização
- Cidade
- Estado
- Código do país (BR)

### Passo 2: Guardar a Keystore com Segurança

⚠️ **IMPORTANTE:** 
- Faça backup em local seguro (nuvem criptografada, pen drive, etc.)
- Guarde as senhas em um gerenciador de senhas
- **Se perder, NUNCA poderá atualizar o app na Play Store!**

### Passo 3: Configurar no Gradle

#### Opção A: Variáveis de Ambiente (Recomendado)

Adicione ao seu `.bashrc` ou `.zshrc`:

```bash
export FORMADORA_KEYSTORE_PATH="/path/to/formadora-release.keystore"
export FORMADORA_KEYSTORE_PASSWORD="sua-senha-store"
export FORMADORA_KEY_ALIAS="formadora"
export FORMADORA_KEY_PASSWORD="sua-senha-key"
```

Depois, atualize `android/app/build.gradle`:

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file(System.getenv("FORMADORA_KEYSTORE_PATH"))
            storePassword System.getenv("FORMADORA_KEYSTORE_PASSWORD")
            keyAlias System.getenv("FORMADORA_KEY_ALIAS")
            keyPassword System.getenv("FORMADORA_KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### Opção B: Arquivo de Propriedades (Mais Seguro)

1. Crie `android/keystore.properties` (não commite no Git!):

```properties
storeFile=/path/to/formadora-release.keystore
storePassword=sua-senha-store
keyAlias=formadora
keyPassword=sua-senha-key
```

2. Adicione ao `.gitignore`:

```
android/keystore.properties
*.keystore
*.jks
```

3. Configure no `android/app/build.gradle`:

```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()

if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    ...
    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
            }
        }
    }
    buildTypes {
        release {
            signingConfig keystorePropertiesFile.exists() ? signingConfigs.release : signingConfigs.debug
            ...
        }
    }
}
```

---

## 📦 Gerando Builds Assinados

### APK Assinado

```bash
cd android
./gradlew assembleRelease
```

**Output:** `android/app/build/outputs/apk/release/app-release.apk`

### AAB (Android App Bundle) - Recomendado para Play Store

```bash
cd android
./gradlew bundleRelease
```

**Output:** `android/app/build/outputs/bundle/release/app-release.aab`

**Vantagens do AAB:**
- 📦 Tamanho menor (~30% menor que APK)
- 🎯 Google gera APKs otimizados para cada dispositivo
- 🚀 Download mais rápido para usuários
- ✅ **Formato preferido pela Play Store**

---

## 🔍 Verificar Assinatura de um APK

### Ver Informações da Assinatura

```bash
jarsigner -verify -verbose -certs app-release.apk
```

### Ver Certificado

```bash
keytool -printcert -jarfile app-release.apk
```

### Informações do Package

```bash
aapt dump badging app-release.apk | grep package
```

---

## 🚨 Troubleshooting

### Erro: "INSTALL_PARSE_FAILED_NO_CERTIFICATES"
**Causa:** APK não está assinado  
**Solução:** Configure a assinatura no build.gradle

### Erro: "INSTALL_FAILED_UPDATE_INCOMPATIBLE"
**Causa:** APK assinado com keystore diferente  
**Solução:** Desinstale o app anterior antes de instalar

```bash
adb uninstall com.faculdade.formadora
adb install app-release.apk
```

### Erro: "Keystore was tampered with"
**Causa:** Senha incorreta  
**Solução:** Verifique a senha da keystore

### Erro: "Cannot recover key"
**Causa:** Senha da key incorreta  
**Solução:** Verifique a senha da key (alias)

---

## 📋 Checklist para Distribuição

Antes de publicar na Play Store:

- [ ] Keystore de produção criada e em backup seguro
- [ ] Senhas guardadas em local seguro
- [ ] `build.gradle` configurado com signing
- [ ] Version code incrementado
- [ ] Version name atualizado
- [ ] Ícones em todas as resoluções
- [ ] Screenshots preparados
- [ ] Descrição do app escrita
- [ ] Política de privacidade criada (se aplicável)
- [ ] AAB gerado e testado
- [ ] App testado em múltiplos dispositivos

---

## 🔐 Boas Práticas de Segurança

1. **NUNCA commite keystores no Git**
   ```gitignore
   *.keystore
   *.jks
   keystore.properties
   ```

2. **Use variáveis de ambiente ou arquivos externos**
   - Não coloque senhas diretamente no código

3. **Faça múltiplos backups da keystore**
   - Nuvem (criptografada)
   - Pen drive
   - Disco externo

4. **Use senhas fortes**
   - Mínimo 8 caracteres
   - Letras, números e símbolos

5. **Restrinja acesso à keystore**
   - Somente pessoas autorizadas

6. **Documente tudo**
   - Onde está a keystore
   - Como recuperar
   - Quem tem acesso

---

## 📚 Referências

- [Android App Signing](https://developer.android.com/studio/publish/app-signing)
- [Generate Upload Key](https://developer.android.com/studio/publish/app-signing#generate-key)
- [Play App Signing](https://support.google.com/googleplay/android-developer/answer/9842756)
- [Keytool Documentation](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html)

---

**Data:** 22/11/2025  
**Status Atual:** Assinado com debug key (OK para testes)  
**Próximo Passo:** Criar keystore de produção antes de publicar

