import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesComponent } from './pages/pages.component';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule, // 追加
    HttpClientModule,
    AppRoutingModule,
    PagesModule,
    BrowserAnimationsModule,  // Import PagesModule để có thể sử dụng các component được export
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
