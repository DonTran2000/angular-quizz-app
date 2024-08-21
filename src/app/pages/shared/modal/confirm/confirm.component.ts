import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  constructor(
    public bsModalRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isCorrect: boolean }
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.bsModalRef.close();
    }, 1000);
  }
}
