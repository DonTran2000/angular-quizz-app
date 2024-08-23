import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'quiz',
        pathMatch: 'full'
      },
      {
        path: 'quiz',
        component: QuizComponent
      },
      {
        path: 'results',
        component: ResultComponent
      }, {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'hoge',
        loadChildren: () =>
          import('./hoge/hoge.module').then((m) => m.HogeModule),
      },
      {
        path: 'fuga',
        loadChildren: () =>
          import('./fuga/fuga.module').then((m) => m.FugaModule),
      },
      {
        path: 'piyo',
        loadChildren: () =>
          import('./piyo/piyo.module').then((m) => m.PiyoModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
