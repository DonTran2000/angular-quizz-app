import { QuizService } from './../quiz.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  results: any[] = [];
  displayedColumns: string[] = ['image', 'question', 'selectedAnswer', 'correctAnswer', 'result'];


  constructor(private quizService: QuizService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    debugger
    const resultsString = localStorage.getItem('quizResults');
    if (resultsString) {
      this.results = JSON.parse(resultsString);
    }
  }
}
