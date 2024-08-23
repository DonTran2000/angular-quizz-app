import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  questionTypeOptions: string[] = ['abilities', 'types', 'name'];

  constructor(private fb: FormBuilder, private settingsService: SettingsService, private router: Router) {
    debugger
    this.settingsForm = this.fb.group({
      numberOfQuestions: [3, [Validators.required, Validators.min(1)]],
      questionTypes: [this.questionTypeOptions, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(settings => {
      debugger
      this.settingsForm.patchValue(settings);
    });
  }

  saveSettings(): void {
    this.settingsService.saveSettings(this.settingsForm.value).subscribe(() => {
      this.router.navigate(['/quiz']);
    });
  }
}
