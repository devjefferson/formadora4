import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class WelcomePage implements OnInit {
  userName: string = '';

  constructor(
    private router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    // Verifica se já tem usuário cadastrado
    if (this.quizService.hasUserName()) {
      // Se já tem usuário, redireciona para o menu principal
      this.router.navigate(['/home']);
    }
  }

  startApp(): void {
   
    this.quizService.setUserName(this.userName || 'Usuário');
      this.router.navigate(['/home']);
   
  }
}

