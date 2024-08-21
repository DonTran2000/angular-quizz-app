import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ConfirmComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [ConfirmComponent]
})
export class ModalModule { }
