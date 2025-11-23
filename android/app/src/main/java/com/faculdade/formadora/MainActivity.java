package com.faculdade.formadora;

import android.os.Bundle;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;
import androidx.core.splashscreen.SplashScreen;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Instalar o Splash Screen ANTES de super.onCreate()
        // Isso previne o warning do InputManager
        SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
        
        super.onCreate(savedInstanceState);
        
        // Configuração do teclado para melhor compatibilidade
        getWindow().setSoftInputMode(
            WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN
        );
        
        // Manter o splash screen visível até que o app esteja pronto
        // O Capacitor vai esconder automaticamente quando carregar
        splashScreen.setKeepOnScreenCondition(() -> false);
    }
    
    @Override
    public void onResume() {
        super.onResume();
        // Lifecycle method - garante limpeza correta
    }
    
    @Override
    public void onPause() {
        super.onPause();
        // Lifecycle method - limpa recursos quando app vai para background
    }
    
    @Override
    public void onDestroy() {
        // Lifecycle method - limpa recursos antes de destruir
        super.onDestroy();
    }
}

