import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PiyoComponent } from './piyo.component';

const routes: Routes = [
  {
    path: 'piyo',
    component: PiyoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PiyoRoutingModule { }
