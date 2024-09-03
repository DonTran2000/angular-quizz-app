import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { MatToolbarModule } from '@angular/material/toolbar';  // Import MatToolbarModule
import { MatListModule } from '@angular/material/list';  // Import MatToolbarList
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { HogeComponent } from './hoge/hoge.component';
import { FugaComponent } from './fuga/fuga.component';
import { PiyoComponent } from './piyo/piyo.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';
import { QuizComponent } from './quiz/quiz.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './shared/modal/modal.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResultComponent } from './result/result.component';
import { MatTableModule } from '@angular/material/table';
import { SettingsComponent } from './settings/settings.component';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    HogeComponent,
    FugaComponent,
    PiyoComponent,
    HeaderComponent,
    SideMenuComponent,
    QuizComponent,
    ResultComponent,
    SettingsComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    HttpClientModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSelectModule,
  ],
  exports: [
    HeaderComponent,
    SideMenuComponent,
    QuizComponent,
  ]
})
export class PagesModule { }
