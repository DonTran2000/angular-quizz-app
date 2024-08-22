import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder, private settingsService: SettingsService, private router: Router) {
    this.settingsForm = this.fb.group({
      numberOfQuestions: [3] // Giá trị mặc định là 3 câu hỏi
    });
  }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(settings => {
      this.settingsForm.patchValue(settings);
    });
  }

  saveSettings(): void {
    // Lưu cài đặt và chuyển đến trang quiz
    this.settingsService.saveSettings(this.settingsForm.value).subscribe(() => {
      this.router.navigate(['/quiz']);
    });
  }
}
