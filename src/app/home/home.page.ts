import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage implements OnInit {
  currentUserName: string = '';

  constructor(
    private router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    // Verifica se tem usuário cadastrado
    if (!this.quizService.hasUserName()) {
      this.router.navigate(['/welcome']);
      return;
    }
    
    this.currentUserName = this.quizService.getUserName();
  }

  goToQuiz(): void {
    this.quizService.reset();
    this.router.navigate(['/quiz']);
  }

  goToHangman(): void {
    this.router.navigate(['/hangman']);
  }

  goToStatistics(): void {
    this.router.navigate(['/statistics']);
  }

  changeUser(): void {
    this.quizService.clearUserName();
    this.router.navigate(['/welcome']);
  }
}

