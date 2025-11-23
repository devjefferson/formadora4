import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then(m => m.WelcomePage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./quiz/quiz.page').then(m => m.QuizPage)
  },
  {
    path: 'results',
    loadComponent: () => import('./results/results.page').then(m => m.ResultsPage)
  },
  {
    path: 'statistics',
    loadComponent: () => import('./statistics/statistics.page').then(m => m.StatisticsPage)
  },
  {
    path: 'hangman',
    loadComponent: () => import('./hangman/hangman.page').then(m => m.HangmanPage)
  },
 
];
