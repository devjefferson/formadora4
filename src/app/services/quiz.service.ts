import { Injectable } from '@angular/core';

export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizAttempt {
  date: Date;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: boolean[];
  categoryScores: { [category: string]: { correct: number; total: number } };
}

export interface UserStats {
  userName: string;
  attempts: QuizAttempt[];
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
}

export interface HangmanGame {
  date: Date;
  won: boolean;
  word: string;
  category: string;
  wrongGuesses: number;
  score: number;
}

export interface HangmanStats {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  totalScore: number;
  winRate: number;
  bestStreak: number;
  currentStreak: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly STORAGE_KEY = 'quiz_user_name';
  private readonly HISTORY_KEY = 'quiz_history';
  private readonly HANGMAN_HISTORY_KEY = 'hangman_history';
  private userName: string = '';
  private currentQuestionIndex: number = 0;
  private score: number = 0;
  private answers: boolean[] = [];
  private categoryScores: { [category: string]: { correct: number; total: number } } = {};

  private questions: Question[] = [
    // Pirataria e uso ético de software
    {
      id: 1,
      category: 'Pirataria e uso ético de software',
      question: 'O uso de software pirata em empresas é legal desde que seja apenas para fins educacionais?',
      options: [
        'Sim, desde que não seja comercializado',
        'Não, é ilegal em qualquer contexto empresarial',
        'Sim, se for para aprendizado',
        'Depende do tipo de software'
      ],
      correctAnswer: 1,
      explanation: 'O uso de software pirata em empresas é sempre ilegal, independentemente da finalidade. Viola direitos autorais e pode resultar em multas e processos.'
    },
    {
      id: 2,
      category: 'Pirataria e uso ético de software',
      question: 'Qual das alternativas representa uma forma ética de usar software sem violar direitos autorais?',
      options: [
        'Baixar versões crackeadas de sites confiáveis',
        'Compartilhar uma licença paga com vários usuários',
        'Usar software de código aberto ou versões gratuitas oficiais',
        'Usar versões de teste permanentemente'
      ],
      correctAnswer: 2,
      explanation: 'Software de código aberto e versões gratuitas oficiais são formas legais e éticas de usar programas sem violar direitos autorais.'
    },
    // Direitos digitais e contratos virtuais
    {
      id: 3,
      category: 'Direitos digitais e contratos virtuais',
      question: 'Ao clicar em "Aceito" nos termos de uso de um aplicativo, você está:',
      options: [
        'Apenas concordando formalmente, mas sem valor legal',
        'Criando um contrato válido juridicamente',
        'Concordando temporariamente até ler os termos',
        'Não está assumindo nenhum compromisso'
      ],
      correctAnswer: 1,
      explanation: 'Ao aceitar termos de uso, você está estabelecendo um contrato digital válido juridicamente, com direitos e obrigações para ambas as partes.'
    },
    {
      id: 4,
      category: 'Direitos digitais e contratos virtuais',
      question: 'Uma empresa pode alterar os termos de uso sem notificar os usuários?',
      options: [
        'Sim, a qualquer momento',
        'Não, é obrigada a notificar e obter novo consentimento',
        'Sim, desde que as mudanças sejam pequenas',
        'Não, precisa de autorização judicial'
      ],
      correctAnswer: 1,
      explanation: 'A empresa deve notificar os usuários sobre alterações nos termos de uso e, dependendo da mudança, obter novo consentimento, conforme estabelece o Marco Civil da Internet.'
    },
    // Inclusão digital e acessibilidade
    {
      id: 5,
      category: 'Inclusão digital e acessibilidade',
      question: 'O que significa acessibilidade digital?',
      options: [
        'Disponibilizar internet gratuita para todos',
        'Garantir que todos possam acessar e usar recursos digitais, incluindo pessoas com deficiência',
        'Criar sites apenas em português',
        'Oferecer computadores mais baratos'
      ],
      correctAnswer: 1,
      explanation: 'Acessibilidade digital significa garantir que pessoas com deficiências possam perceber, entender, navegar e interagir com tecnologias digitais.'
    },
    {
      id: 6,
      category: 'Inclusão digital e acessibilidade',
      question: 'Qual recurso NÃO contribui para a acessibilidade web?',
      options: [
        'Texto alternativo em imagens',
        'Navegação por teclado',
        'Uso exclusivo de cores para transmitir informações',
        'Legendas em vídeos'
      ],
      correctAnswer: 2,
      explanation: 'Depender apenas de cores para transmitir informações prejudica pessoas com daltonismo. É necessário usar também ícones, textos ou padrões.'
    },
    // Sustentabilidade e lixo eletrônico
    {
      id: 7,
      category: 'Sustentabilidade e lixo eletrônico',
      question: 'Qual é a forma correta de descartar equipamentos eletrônicos obsoletos?',
      options: [
        'Jogar no lixo comum',
        'Entregar em pontos de coleta de lixo eletrônico',
        'Queimar para reduzir volume',
        'Enterrar no quintal'
      ],
      correctAnswer: 1,
      explanation: 'Equipamentos eletrônicos contêm substâncias tóxicas e devem ser entregues em pontos de coleta especializados para reciclagem adequada.'
    },
    {
      id: 8,
      category: 'Sustentabilidade e lixo eletrônico',
      question: 'O que é obsolescência programada?',
      options: [
        'Programas de reciclagem de eletrônicos',
        'Estratégia de reduzir propositalmente a vida útil de produtos',
        'Software que detecta produtos obsoletos',
        'Programa de desconto em eletrônicos novos'
      ],
      correctAnswer: 1,
      explanation: 'Obsolescência programada é a estratégia de fabricar produtos com vida útil limitada propositalmente, gerando mais lixo eletrônico e consumo.'
    },
    // Proteção de dados pessoais
    {
      id: 9,
      category: 'Proteção de dados pessoais',
      question: 'Segundo a LGPD, dados pessoais sensíveis incluem:',
      options: [
        'Apenas CPF e RG',
        'Origem racial, dados de saúde, biométricos e orientação sexual',
        'Somente senhas bancárias',
        'Apenas informações de cartão de crédito'
      ],
      correctAnswer: 1,
      explanation: 'Dados sensíveis pela LGPD incluem origem racial ou étnica, convicção religiosa, opinião política, dados de saúde, biométricos, orientação sexual, entre outros.'
    },
    {
      id: 10,
      category: 'Proteção de dados pessoais',
      question: 'Você pode solicitar a exclusão dos seus dados pessoais de uma empresa?',
      options: [
        'Não, uma vez fornecidos, pertencem à empresa',
        'Sim, é um direito garantido pela LGPD',
        'Somente se pagar uma taxa',
        'Apenas com ordem judicial'
      ],
      correctAnswer: 1,
      explanation: 'A LGPD garante o direito à eliminação de dados pessoais tratados com consentimento, salvo em casos específicos previstos em lei.'
    },
    // Segurança da informação e legislação brasileira (LGPD)
    {
      id: 11,
      category: 'Segurança da informação e LGPD',
      question: 'O que é um vazamento de dados?',
      options: [
        'Quando uma pessoa esquece sua senha',
        'Quando dados confidenciais são expostos a pessoas não autorizadas',
        'Quando um site fica fora do ar',
        'Quando um arquivo é excluído acidentalmente'
      ],
      correctAnswer: 1,
      explanation: 'Vazamento de dados ocorre quando informações confidenciais são expostas, acessadas ou divulgadas de forma não autorizada.'
    },
    {
      id: 12,
      category: 'Segurança da informação e LGPD',
      question: 'Qual é a multa máxima prevista na LGPD para empresas que violarem a lei?',
      options: [
        'R$ 10 mil',
        'R$ 500 mil',
        'R$ 50 milhões por infração',
        'Não há multas, apenas advertências'
      ],
      correctAnswer: 2,
      explanation: 'A LGPD prevê multa de até 2% do faturamento da empresa, limitada a R$ 50 milhões por infração, além de outras sanções.'
    },
    {
      id: 13,
      category: 'Segurança da informação e LGPD',
      question: 'O que caracteriza uma senha forte?',
      options: [
        'Apenas números',
        'Nome e data de nascimento',
        'Combinação de letras maiúsculas, minúsculas, números e símbolos',
        'Palavras comuns do dicionário'
      ],
      correctAnswer: 2,
      explanation: 'Uma senha forte deve combinar diferentes tipos de caracteres (letras maiúsculas e minúsculas, números e símbolos) e ter comprimento adequado.'
    },
    {
      id: 14,
      category: 'Segurança da informação e LGPD',
      question: 'A LGPD se aplica a:',
      options: [
        'Apenas grandes empresas',
        'Somente empresas de tecnologia',
        'Qualquer organização que trate dados pessoais no Brasil',
        'Apenas órgãos públicos'
      ],
      correctAnswer: 2,
      explanation: 'A LGPD se aplica a qualquer operação de tratamento de dados pessoais realizada no Brasil, independentemente do tamanho ou setor da organização.'
    },
    {
      id: 15,
      category: 'Segurança da informação e LGPD',
      question: 'O que você deve fazer se receber um e-mail suspeito solicitando dados pessoais?',
      options: [
        'Responder imediatamente com as informações',
        'Ignorar, excluir e reportar como phishing',
        'Encaminhar para amigos para opinarem',
        'Clicar nos links para verificar se é legítimo'
      ],
      correctAnswer: 1,
      explanation: 'E-mails suspeitos solicitando dados podem ser tentativas de phishing. Nunca forneça informações, exclua e reporte como spam ou phishing.'
    }
  ];

  constructor() {
    this.loadUserName();
  }

  private loadUserName(): void {
    const savedName = localStorage.getItem(this.STORAGE_KEY);
    if (savedName) {
      this.userName = savedName;
    }
  }

  setUserName(name: string): void {
    this.userName = name;
    localStorage.setItem(this.STORAGE_KEY, name);
  }

  hasUserName(): boolean {
    return !!this.userName || !!localStorage.getItem(this.STORAGE_KEY);
  }

  clearUserName(): void {
    this.userName = '';
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getUserName(): string {
    return this.userName;
  }

  getQuestions(): Question[] {
    return this.questions;
  }

  getCurrentQuestion(): Question | null {
    if (this.currentQuestionIndex < this.questions.length) {
      return this.questions[this.currentQuestionIndex];
    }
    return null;
  }

  getCurrentQuestionIndex(): number {
    return this.currentQuestionIndex;
  }

  getTotalQuestions(): number {
    return this.questions.length;
  }

  answerQuestion(selectedAnswer: number): boolean {
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      this.answers.push(isCorrect);
      
      // Atualiza pontuação por categoria
      const category = currentQuestion.category;
      if (!this.categoryScores[category]) {
        this.categoryScores[category] = { correct: 0, total: 0 };
      }
      this.categoryScores[category].total++;
      if (isCorrect) {
        this.score++;
        this.categoryScores[category].correct++;
      }
      
      return isCorrect;
    }
    return false;
  }

  // Novo método para registrar resposta já verificada
  recordAnswer(isCorrect: boolean): void {
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion) {
      this.answers.push(isCorrect);
      
      // Atualiza pontuação por categoria
      const category = currentQuestion.category;
      if (!this.categoryScores[category]) {
        this.categoryScores[category] = { correct: 0, total: 0 };
      }
      this.categoryScores[category].total++;
      if (isCorrect) {
        this.score++;
        this.categoryScores[category].correct++;
      }
    }
  }

  nextQuestion(): boolean {
    this.currentQuestionIndex++;
    return this.currentQuestionIndex < this.questions.length;
  }

  getScore(): number {
    return this.score;
  }

  getAnswers(): boolean[] {
    return this.answers;
  }

  getPercentage(): number {
    return Math.round((this.score / this.questions.length) * 100);
  }

  reset(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answers = [];
    this.categoryScores = {};
  }

  saveAttempt(): void {
    const attempt: QuizAttempt = {
      date: new Date(),
      score: this.score,
      totalQuestions: this.questions.length,
      percentage: this.getPercentage(),
      answers: [...this.answers],
      categoryScores: { ...this.categoryScores }
    };

    const history = this.getHistory();
    history.push(attempt);
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
  }

  getHistory(): QuizAttempt[] {
    const historyStr = localStorage.getItem(this.HISTORY_KEY);
    if (historyStr) {
      const history = JSON.parse(historyStr);
      // Converter strings de data em objetos Date
      return history.map((attempt: any) => ({
        ...attempt,
        date: new Date(attempt.date)
      }));
    }
    return [];
  }

  getUserStats(): UserStats {
    const history = this.getHistory();
    const scores = history.map(a => a.percentage);
    
    return {
      userName: this.userName,
      attempts: history,
      totalAttempts: history.length,
      averageScore: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
      bestScore: scores.length > 0 ? Math.max(...scores) : 0,
      worstScore: scores.length > 0 ? Math.min(...scores) : 0
    };
  }

  getCategoryStats(): { [category: string]: { correct: number; total: number; percentage: number } } {
    const history = this.getHistory();
    const categoryTotals: { [category: string]: { correct: number; total: number } } = {};

    history.forEach(attempt => {
      Object.keys(attempt.categoryScores).forEach(category => {
        if (!categoryTotals[category]) {
          categoryTotals[category] = { correct: 0, total: 0 };
        }
        categoryTotals[category].correct += attempt.categoryScores[category].correct;
        categoryTotals[category].total += attempt.categoryScores[category].total;
      });
    });

    const result: { [category: string]: { correct: number; total: number; percentage: number } } = {};
    Object.keys(categoryTotals).forEach(category => {
      const stats = categoryTotals[category];
      result[category] = {
        ...stats,
        percentage: Math.round((stats.correct / stats.total) * 100)
      };
    });

    return result;
  }

  clearHistory(): void {
    localStorage.removeItem(this.HISTORY_KEY);
  }

  // Métodos para Jogo da Forca
  saveHangmanGame(game: HangmanGame): void {
    const history = this.getHangmanHistory();
    history.push(game);
    localStorage.setItem(this.HANGMAN_HISTORY_KEY, JSON.stringify(history));
  }

  getHangmanHistory(): HangmanGame[] {
    const historyStr = localStorage.getItem(this.HANGMAN_HISTORY_KEY);
    if (historyStr) {
      const history = JSON.parse(historyStr);
      return history.map((game: any) => ({
        ...game,
        date: new Date(game.date)
      }));
    }
    return [];
  }

  getHangmanStats(): HangmanStats {
    const history = this.getHangmanHistory();
    const gamesWon = history.filter(g => g.won).length;
    const gamesLost = history.filter(g => !g.won).length;
    const totalScore = history.reduce((sum, g) => sum + g.score, 0);

    // Calcula melhor sequência de vitórias
    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 0;

    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].won) {
        tempStreak++;
        if (i === history.length - 1) {
          currentStreak = tempStreak;
        }
      } else {
        if (i === history.length - 1) {
          currentStreak = 0;
        }
        tempStreak = 0;
      }
      bestStreak = Math.max(bestStreak, tempStreak);
    }

    return {
      gamesPlayed: history.length,
      gamesWon,
      gamesLost,
      totalScore,
      winRate: history.length > 0 ? Math.round((gamesWon / history.length) * 100) : 0,
      bestStreak,
      currentStreak
    };
  }

  clearHangmanHistory(): void {
    localStorage.removeItem(this.HANGMAN_HISTORY_KEY);
  }
}

