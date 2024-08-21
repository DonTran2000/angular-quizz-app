import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  show(isCorrect: boolean): void {
    this.dialog.open(ConfirmComponent, {
      data: {
        isCorrect: isCorrect
      }
    });
  }
}
