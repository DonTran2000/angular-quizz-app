import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: any[] = [];
  urlData: string = '/assets/data/pokemon_data.json';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<any[]>(this.urlData);
  }


  generateQuestion(): { no: number; question: string; answers: string[], name: string, types: string[], evolutions: string[]; correctAnswer: string } | null {
    debugger
    const pokemon = this.getRandomPokemon();
    const correctAnswer = this.getCorrectAnswer(pokemon);
    const dummyOptions = this.getDummyOptions(correctAnswer);
    const answers = this.shuffleAnswers([correctAnswer, ...dummyOptions]);

    return {
      no: pokemon.no,
      question: `${pokemon.name}のとくせいは？`,
      name: pokemon.name,
      types: pokemon.types,
      evolutions: pokemon.evolutions,
      answers: answers,
      correctAnswer: correctAnswer
    };
  }

  private getRandomPokemon(): any {
    return this.data[Math.floor(Math.random() * this.data.length)];
  }

  private getCorrectAnswer(pokemon: any): string {
    return pokemon.abilities[0];
  }

  private getDummyOptions(correctAnswer: string): string[] {
    return this.data
      .map(p => p.abilities)
      .filter(ability => ability !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }

  private shuffleAnswers(answers: string[]): string[] {
    return answers.sort(() => 0.5 - Math.random());
  }

  loadDataAndGenerateQuestion(): Observable<{ no: number; question: string; answers: string[]; name: string; types: string[]; evolutions: string[]; correctAnswer: string }> {
    return this.getData().pipe(
      map(data => {
        this.data = data;
        const questionData = this.generateQuestion();
        return questionData || { no: NaN, question: 'No question available', answers: [], name: '', types: [], evolutions: [], correctAnswer: '' };
      })
    );
  }
}
