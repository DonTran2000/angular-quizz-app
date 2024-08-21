import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private settingsSubject = new BehaviorSubject<{ numberOfQuestions: number }>({ numberOfQuestions: 3 });
    settings$ = this.settingsSubject.asObservable();

    getSettings(): Observable<{ numberOfQuestions: number }> {
        return this.settings$;
    }

    saveSettings(settings: { numberOfQuestions: number }): Observable<void> {
        this.settingsSubject.next(settings);
        return new Observable<void>(observer => {
            observer.next();
            observer.complete();
        });
    }
}
