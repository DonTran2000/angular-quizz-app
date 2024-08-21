import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FugaComponent } from './fuga.component';

const routes: Routes = [
  {
    path: 'fuga',
    component: FugaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FugaRoutingModule { }
