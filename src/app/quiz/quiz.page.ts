import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { QuizService, Question } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class QuizPage implements OnInit {
  currentQuestion: Question | null = null;
  shuffledOptions: string[] = [];
  correctAnswerIndex: number = 0;
  selectedAnswer: number | null = null;
  showExplanation: boolean = false;
  isCorrect: boolean = false;
  progress: number = 0;

  constructor(
    private router: Router,
    public quizService: QuizService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    if (!this.quizService.getUserName()) {
      this.router.navigate(['/welcome']);
      return;
    }
    this.loadQuestion();
  }

  loadQuestion(): void {
    this.currentQuestion = this.quizService.getCurrentQuestion();
    this.selectedAnswer = null;
    this.showExplanation = false;
    this.updateProgress();
    
    // Embaralha as opções
    if (this.currentQuestion) {
      this.shuffleOptions();
    }
  }

  shuffleOptions(): void {
    if (!this.currentQuestion) return;
    
    // Cria um array de objetos com opção e índice original
    const optionsWithIndex = this.currentQuestion.options.map((option, index) => ({
      option,
      originalIndex: index
    }));
    
    // Embaralha o array
    for (let i = optionsWithIndex.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
    }
    
    // Extrai as opções embaralhadas
    this.shuffledOptions = optionsWithIndex.map(item => item.option);
    
    // Encontra o novo índice da resposta correta
    this.correctAnswerIndex = optionsWithIndex.findIndex(
      item => item.originalIndex === this.currentQuestion!.correctAnswer
    );
  }

  selectAnswer(index: number): void {
    if (!this.showExplanation) {
      this.selectedAnswer = index;
    }
  }

  submitAnswer(): void {
    if (this.selectedAnswer !== null && !this.showExplanation) {
      // Verifica se a resposta selecionada é a correta (índice embaralhado)
      this.isCorrect = this.selectedAnswer === this.correctAnswerIndex;
      this.quizService.recordAnswer(this.isCorrect);
      this.showExplanation = true;
    }
  }

  nextQuestion(): void {
    const hasNext = this.quizService.nextQuestion();
    if (hasNext) {
      this.loadQuestion();
    } else {
      this.router.navigate(['/results']);
    }
  }

  updateProgress(): void {
    const current = this.quizService.getCurrentQuestionIndex() + 1;
    const total = this.quizService.getTotalQuestions();
    this.progress = current / total;
  }

  getQuestionNumber(): string {
    return `${this.quizService.getCurrentQuestionIndex() + 1} de ${this.quizService.getTotalQuestions()}`;
  }

  getOptionClass(index: number): string {
    if (!this.showExplanation) {
      return this.selectedAnswer === index ? 'selected' : '';
    }
    
    // Mostra a resposta correta (índice embaralhado)
    if (index === this.correctAnswerIndex) {
      return 'correct';
    }
    
    // Mostra a resposta incorreta selecionada
    if (index === this.selectedAnswer && !this.isCorrect) {
      return 'incorrect';
    }
    
    return '';
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  getUserName(): string {
    return this.quizService.getUserName();
  }

  async changeUser(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Trocar de Usuário',
      message: 'Tem certeza? O progresso do quiz atual será perdido.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sim, trocar',
          handler: () => {
            this.quizService.clearUserName();
            this.router.navigate(['/welcome']);
          }
        }
      ]
    });
    
    await alert.present();
  }

  async viewStats(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Ver Estatísticas',
      message: 'O progresso do quiz atual será perdido. Deseja continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ver Estatísticas',
          handler: () => {
            this.router.navigate(['/statistics']);
          }
        }
      ]
    });
    
    await alert.present();
  }

  async exitQuiz(): Promise<void> {
    const currentQuestion = this.quizService.getCurrentQuestionIndex() + 1;
    const totalQuestions = this.quizService.getTotalQuestions();
    
    const alert = await this.alertController.create({
      header: 'Sair do Quiz',
      message: `Você está na pergunta ${currentQuestion} de ${totalQuestions}. Deseja voltar ao menu principal? Seu progresso será perdido.`,
      buttons: [
        {
          text: 'Continuar Quiz',
          role: 'cancel'
        },
        {
          text: 'Voltar ao Menu',
          role: 'destructive',
          handler: () => {
            this.quizService.reset();
            this.router.navigate(['/welcome']);
          }
        }
      ]
    });
    
    await alert.present();
  }
}

