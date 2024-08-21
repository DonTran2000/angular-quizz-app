import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private results: any[] = [];

    setQuizResults(results: any[]): void {
        this.results = results;
    }

    getQuizResults(): any[] {
        return this.results;
    }
}
