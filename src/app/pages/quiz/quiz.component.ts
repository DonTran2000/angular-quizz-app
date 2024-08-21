import { QuizService } from './../quiz.service';
import { ModalModule } from '../shared/modal/modal.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { ModalService } from '../shared/modal/modal.service';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  questionNumber: number = 1;
  maxQuestions: number = 3;
  score: number = 0;
  quizCompleted: boolean = false;

  no?: string = '';
  name?: string;
  types?: string[];
  evolutions?: string[];
  question?: string;
  answers?: string[];
  correctAnswer?: string;
  resultMessage?: string;
  currentQuestion?: any;

  quizResults: any[] = [];

  form: FormGroup;
  data: any;
  isLoading: boolean = true;

  buttonClasses: string[] = ['primaryButton', 'warnButton', 'accentButton', 'tertiaryButton'];

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private router: Router,
    private settingsService: SettingsService
  ) {
    this.form = this.fb.group({
      name: [''],
      english_name: [''],
      types: [''],
      evolutions: ['']
    });
  }

  ngOnInit(): void {
    // Lấy số lượng câu hỏi từ SettingsService
    this.settingsService.settings$.subscribe(settings => {
      this.maxQuestions = settings.numberOfQuestions;
    });
    this.loadData();
  }

  private formatNumberToThreeDigits(no: number): string {
    return no.toString().padStart(3, '0'); // Chuyển số thành chuỗi và thêm số 0 vào đầu cho đủ 3 chữ số
  }

  loadNextQuestion() {
    this.dataService.loadDataAndGenerateQuestion().subscribe(questionData => {
      this.no = this.formatNumberToThreeDigits(questionData.no);
      this.question = questionData.question;
      this.answers = questionData.answers;
      this.name = questionData.name;
      this.types = questionData.types;
      this.evolutions = questionData.evolutions.length ? questionData.evolutions : ["しない"];
      this.correctAnswer = questionData.correctAnswer;

      this.form.patchValue({
        name: this.name,
        types: this.types?.join(', '),
        evolutions: this.evolutions?.join(', ')
      });
    });
  }

  loadData() {
    this.loadNextQuestion();
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  register(answer: string): void {

    if (answer === this.correctAnswer) {
      this.score++;
      this.modalService.show(true);
    } else {
      this.modalService.show(false);
    }

    this.quizResults.push({
      image: `assets/images/pokemon/${this.no}.png`,
      question: this.question,
      selectedAnswer: answer,
      correctAnswer: this.correctAnswer
    });

    setTimeout(() => {
      if (this.questionNumber >= this.maxQuestions) {
        this.completeQuiz();
      } else {
        this.questionNumber++;
        this.loadNextQuestion();
      }
    }, 1000);
  }

  endGame() {
    this.quizCompleted = true;
  }

  completeQuiz() {
    this.endGame();
    localStorage.setItem('quizResults', JSON.stringify(this.quizResults));
    this.router.navigate(['/results']);
  }

  restartGame() {
    this.quizCompleted = false;
    this.score = 0;
    this.questionNumber = 1;
    this.quizResults = []; // Xóa kết quả cũ khi bắt đầu trò chơi mới
    this.loadData();
  }
}
