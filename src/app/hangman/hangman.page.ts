import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { QuizService, HangmanGame } from '../services/quiz.service';

interface HangmanWord {
  word: string;
  hint: string;
  category: string;
}

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.page.html',
  styleUrls: ['./hangman.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HangmanPage implements OnInit {
  words: HangmanWord[] = [
    { word: 'LGPD', hint: 'Lei de proteção de dados no Brasil', category: 'Legislação' },
    { word: 'PHISHING', hint: 'Técnica de fraude online para roubar dados', category: 'Segurança' },
    { word: 'FIREWALL', hint: 'Barreira de proteção de rede', category: 'Segurança' },
    { word: 'CRIPTOGRAFIA', hint: 'Técnica de codificação de informações', category: 'Segurança' },
    { word: 'MALWARE', hint: 'Software malicioso', category: 'Segurança' },
    { word: 'BACKUP', hint: 'Cópia de segurança de dados', category: 'Tecnologia' },
    { word: 'COOKIE', hint: 'Arquivo que rastreia atividades online', category: 'Privacidade' },
    { word: 'SPAM', hint: 'Mensagem não solicitada em massa', category: 'Internet' },
    { word: 'RANSOMWARE', hint: 'Malware que sequestra dados', category: 'Segurança' },
    { word: 'VPN', hint: 'Rede privada virtual', category: 'Segurança' },
    { word: 'ANTIVIRUS', hint: 'Programa de proteção contra vírus', category: 'Segurança' },
    { word: 'HACKER', hint: 'Especialista em invadir sistemas', category: 'Segurança' },
    { word: 'SENHA', hint: 'Código secreto de acesso', category: 'Segurança' },
    { word: 'PIRATARIA', hint: 'Cópia ilegal de software', category: 'Ética' },
    { word: 'ACESSIBILIDADE', hint: 'Facilidade de uso para todos', category: 'Inclusão' },
    { word: 'SUSTENTABILIDADE', hint: 'Práticas ambientalmente responsáveis', category: 'Meio Ambiente' },
    { word: 'AUTENTICACAO', hint: 'Verificação de identidade', category: 'Segurança' },
    { word: 'CLOUD', hint: 'Armazenamento na nuvem', category: 'Tecnologia' },
    { word: 'TOKEN', hint: 'Código de segurança temporário', category: 'Segurança' },
    { word: 'FIREWALL', hint: 'Barreira contra acessos não autorizados', category: 'Segurança' }
  ];

  currentWord: HangmanWord | null = null;
  displayWord: string[] = [];
  guessedLetters: string[] = [];
  wrongGuesses: number = 0;
  maxWrongGuesses: number = 6;
  gameOver: boolean = false;
  won: boolean = false;
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  score: number = 0;
  gamesPlayed: number = 0;

  constructor(
    private router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    if (!this.quizService.getUserName()) {
      this.router.navigate(['/home']);
      return;
    }
    this.loadStats();
    this.startNewGame();
  }

  loadStats(): void {
    const stats = this.quizService.getHangmanStats();
    this.score = stats.totalScore;
    this.gamesPlayed = stats.gamesPlayed;
  }

  startNewGame(): void {
    // Seleciona palavra aleatória
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.currentWord = this.words[randomIndex];
    
    // Inicializa o display da palavra
    this.displayWord = this.currentWord.word.split('').map(() => '_');
    
    // Reset do jogo
    this.guessedLetters = [];
    this.wrongGuesses = 0;
    this.gameOver = false;
    this.won = false;
  }

  guessLetter(letter: string): void {
    if (this.gameOver || this.guessedLetters.includes(letter)) {
      return;
    }

    this.guessedLetters.push(letter);

    if (this.currentWord!.word.includes(letter)) {
      // Letra correta - revela posições
      this.currentWord!.word.split('').forEach((char, index) => {
        if (char === letter) {
          this.displayWord[index] = letter;
        }
      });

      // Verifica se ganhou
      if (!this.displayWord.includes('_')) {
        this.won = true;
        this.gameOver = true;
        this.score += 10;
        this.gamesPlayed++;
        this.saveGame();
      }
    } else {
      // Letra errada
      this.wrongGuesses++;

      // Verifica se perdeu
      if (this.wrongGuesses >= this.maxWrongGuesses) {
        this.gameOver = true;
        this.won = false;
        this.gamesPlayed++;
        // Revela a palavra
        this.displayWord = this.currentWord!.word.split('');
        this.saveGame();
      }
    }
  }

  isLetterGuessed(letter: string): boolean {
    return this.guessedLetters.includes(letter);
  }

  isLetterCorrect(letter: string): boolean {
    return this.guessedLetters.includes(letter) && this.currentWord!.word.includes(letter);
  }

  isLetterWrong(letter: string): boolean {
    return this.guessedLetters.includes(letter) && !this.currentWord!.word.includes(letter);
  }

  getLetterClass(letter: string): string {
    if (this.isLetterCorrect(letter)) {
      return 'correct';
    }
    if (this.isLetterWrong(letter)) {
      return 'wrong';
    }
    return '';
  }

  getHangmanImage(): string {
    return `assets/hangman/hangman-${this.wrongGuesses}.svg`;
  }

  playAgain(): void {
    this.startNewGame();
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  getUserName(): string {
    return this.quizService.getUserName();
  }

  saveGame(): void {
    const game: HangmanGame = {
      date: new Date(),
      won: this.won,
      word: this.currentWord!.word,
      category: this.currentWord!.category,
      wrongGuesses: this.wrongGuesses,
      score: this.won ? 10 : 0
    };
    this.quizService.saveHangmanGame(game);
  }
}

