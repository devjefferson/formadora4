import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard, KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.initializeApp();
    });
  }

  async initializeApp() {
    try {
      // Configurar StatusBar para dark mode
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#0f172a' });

      // Garantir que o Keyboard está configurado corretamente
      await Keyboard.setStyle({ style: KeyboardStyle.Dark });
      
      // Prevenir que o teclado redimensione o app (já está no config, mas reforçamos)
      await Keyboard.setResizeMode({ mode: KeyboardResize.None });

      console.log('✅ App inicializado com sucesso!');
    } catch (error) {
      // Alguns plugins podem não estar disponíveis no navegador
      console.log('ℹ️ Plugins do Capacitor não disponíveis (modo navegador)');
    }
  }
}
