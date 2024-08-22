import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, from, map, Observable, of } from 'rxjs';
import { PokemonClient } from 'pokenode-ts';

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


  generateAbilitiesQuestion(): {
    no: string;
    question: string;
    answers: string[],
    name: string,
    types: string[],
    evolutions: string[];
    correctAnswer: string;
    questionType: string;
    hint: string
  } | null {
    debugger
    const pokemon = this.getRandomPokemon();
    const correctAnswer = this.getCorrectAnswerAbilities(pokemon);
    const dummyAbilitiesOptions = this.getDummyAbilitiesOptions(correctAnswer);
    const answers = this.shuffleAnswers([correctAnswer, ...dummyAbilitiesOptions]);

    return {
      no: pokemon.no,
      question: `このポケモンのとくせいは？`,
      name: pokemon.name,
      types: pokemon.types,
      evolutions: pokemon.evolutions,
      answers: answers,
      correctAnswer: correctAnswer,
      questionType: 'abilities',
      hint: `ヒント: この能力は、<b>${pokemon.types.join(', ')}</b> タイプのポケモンによく見られます。`
    };
  }

  generateTypeQuestion(): { no: string; question: string; answers: string[], name: string, abilities: string[], evolutions: string[], correctAnswer: string; questionType: string } | null {
    debugger
    const pokemon = this.getRandomPokemon();
    const correctAnswer = pokemon.types[0];
    const dummyTypesOptions = this.getDummyTypesOptions(correctAnswer);
    const answers = this.shuffleAnswers([correctAnswer, ...dummyTypesOptions]);

    return {
      no: pokemon.no,
      question: `このポケモンのタイプは？`,
      name: pokemon.name,
      evolutions: pokemon.evolutions,
      abilities: pokemon.abilities,
      answers: answers,
      correctAnswer: correctAnswer,
      questionType: 'types'
    };
  }

  async generatePokemonQuestion(): Promise<{ no: string; question: string; hint: string; answers: string[]; correctAnswer: string; questionType: string | undefined; }> {
    debugger
    const pokemonFromJS = this.getRandomPokemon();
    const id = pokemonFromJS.no;
    const japaneseName = pokemonFromJS.name;
    const dummyNameOptions = this.getDummyNameOptions(japaneseName);
    const answers = this.shuffleAnswers([japaneseName, ...dummyNameOptions]);
    let hint = "";

    const api = new PokemonClient();
    const pokemonData = await api.getPokemonById(id);
    console.log(pokemonData.id);
    const englishName = pokemonData.name;
    console.log(englishName);

    hint = `ヒント: このポケモンの名前は英語で「${englishName}」です。`;
    return {
      no: id,
      question: `このポケモンの名前はなんですか？`,
      hint: hint,
      answers: answers,
      correctAnswer: japaneseName,
      questionType: 'name'
    };

  }

  private getRandomPokemon(): any {
    return this.data[Math.floor(Math.random() * this.data.length)];
  }

  private getCorrectAnswerAbilities(pokemon: any): string {
    return pokemon.abilities[0];
  }

  private getDummyAbilitiesOptions(correctAnswer: string): string[] {
    return this.data
      .map(p => p.abilities)
      .filter(ability => ability !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }

  private getDummyTypesOptions(correctAnswer: string): string[] {
    return this.data
      .map(p => p.types)
      .filter(types => types !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }

  private getDummyNameOptions(japaneseName: string): string[] {
    return this.data
      .map(p => p.name)
      .filter(name => name !== japaneseName)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }

  private shuffleAnswers(answers: string[]): string[] {
    return answers.sort(() => 0.5 - Math.random());
  }

  loadDataAndGenerateQuestion(): Observable<any> {
    return this.getData().pipe(
      map(data => {
        this.data = data;
        const questionData = this.generateRandomQuestion();
        return questionData || from(this.generatePokemonQuestion());
      })
    );
  }

  generateRandomQuestion() {
    const questionTypes = [
      this.generateAbilitiesQuestion.bind(this),
      this.generateTypeQuestion.bind(this),
      this.generatePokemonQuestion.bind(this),
      // Add more question types here
    ];

    const randomIndex = Math.floor(Math.random() * questionTypes.length);
    return questionTypes[randomIndex]();
  }

}
