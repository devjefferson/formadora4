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
  hasUser: boolean = false;
  currentUserName: string = '';

  constructor(
    private router: Router,
    private quizService: QuizService
  ) {}


  ngOnInit(): void {
    // Verifica se já tem nome salvo
    if (this.quizService.hasUserName()) {
      this.hasUser = true;
      this.currentUserName = this.quizService.getUserName();
    }
  }

  startQuiz(): void {
    if (this.userName.trim()) {
      this.quizService.setUserName(this.userName);
      this.quizService.clearHistory()
      this.quizService.clearHangmanHistory()
      window.location.reload();
    }
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
    this.hasUser = false;
    this.currentUserName = '';
  }
}

