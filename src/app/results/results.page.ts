import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ResultsPage implements OnInit {
  userName: string = '';
  score: number = 0;
  totalQuestions: number = 0;
  percentage: number = 0;
  message: string = '';
  messageColor: string = '';

  topics = [
    { name: 'Pirataria e uso ético', icon: 'shield-checkmark-outline', color: 'primary' },
    { name: 'Direitos digitais', icon: 'document-text-outline', color: 'secondary' },
    { name: 'Inclusão digital', icon: 'people-outline', color: 'success' },
    { name: 'Sustentabilidade', icon: 'leaf-outline', color: 'tertiary' },
    { name: 'Proteção de dados', icon: 'lock-closed-outline', color: 'warning' },
    { name: 'LGPD e Segurança', icon: 'newspaper-outline', color: 'danger' }
  ];

  constructor(
    private router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    if (!this.quizService.getUserName()) {
      this.router.navigate(['/home']);
      return;
    }

    this.userName = this.quizService.getUserName();
    this.score = this.quizService.getScore();
    this.totalQuestions = this.quizService.getTotalQuestions();
    this.percentage = this.quizService.getPercentage();
    this.setMessage();
    
    // Salva a tentativa no histórico
    this.quizService.saveAttempt();
  }

  setMessage(): void {
    if (this.percentage >= 90) {
      this.message = 'Excelente! Você domina o assunto!';
      this.messageColor = 'success';
    } else if (this.percentage >= 70) {
      this.message = 'Muito bem! Bom conhecimento!';
      this.messageColor = 'secondary';
    } else if (this.percentage >= 50) {
      this.message = 'Bom trabalho! Continue estudando!';
      this.messageColor = 'warning';
    } else {
      this.message = 'Continue aprendendo! Você vai melhorar!';
      this.messageColor = 'danger';
    }
  }

  getPerformanceIcon(): string {
    if (this.percentage >= 90) return 'trophy';
    if (this.percentage >= 70) return 'ribbon';
    if (this.percentage >= 50) return 'thumbs-up';
    return 'school';
  }

  restartQuiz(): void {
    this.quizService.reset();
    this.router.navigate(['/quiz']);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  changeUser(): void {
    this.quizService.clearUserName();
    this.router.navigate(['/welcome']);
  }

  viewStats(): void {
    this.router.navigate(['/statistics']);
  }

  shareResults(): void {
    const text = `Completei o Quiz de Ética Digital! Acertei ${this.score} de ${this.totalQuestions} perguntas (${this.percentage}%)!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz de Ética Digital',
        text: text
      }).catch(() => {
        // Usuário cancelou o compartilhamento
      });
    } else {
      // Fallback: copiar para área de transferência
      navigator.clipboard.writeText(text).then(() => {
        alert('Resultado copiado para a área de transferência!');
      });
    }
  }

  getCircumference(): string {
    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    return `${circumference} ${circumference}`;
  }

  getDashOffset(): number {
    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    return circumference - (this.percentage / 100) * circumference;
  }

  getProgressColor(): string {
    if (this.percentage >= 90) return 'var(--ion-color-success)';
    if (this.percentage >= 70) return 'var(--ion-color-primary)';
    if (this.percentage >= 50) return 'var(--ion-color-warning)';
    return 'var(--ion-color-danger)';
  }
}

