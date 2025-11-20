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
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
];
