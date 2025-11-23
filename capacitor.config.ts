import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.faculdade.formadora',
  appName: 'Formadora IV',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: true  // Permitir HTTP para assets locais e desenvolvimento
  },
  android: {
    allowMixedContent: false,
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      releaseType: 'APK'
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500, // Reduzido para evitar conflitos com InputManager
      launchAutoHide: true, // Auto-hide para limpar recursos corretamente
      backgroundColor: "#1e1e1e",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      spinnerColor: "#ffffff"
    },
    Keyboard: {
      resize: 'none', // Corrigido: estava 'body', deve ser 'none' para adjustPan
      style: 'dark',
      resizeOnFullScreen: false // Desabilitado para evitar conflitos
    }
  }
};

export default config;
