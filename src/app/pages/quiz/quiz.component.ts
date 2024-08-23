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
  showHint: boolean = false;
  hint: string = '';

  questionNumber: number = 1;
  maxQuestions: number = 3;
  questionTypes!: string[];
  settingQuestionType: string = '';
  score: number = 0;

  no?: string = '';
  name?: string;
  types?: string[];
  evolutions?: string[];
  question?: string;
  answers?: string[];
  correctAnswer?: string;
  resultMessage?: string;
  currentQuestion?: any;
  questionType?: string;
  abilities?: string[];

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
      types: [''],
      evolutions: [''],
      abilities: ['']
    });
  }

  ngOnInit(): void {
    // Lấy số lượng câu hỏi từ SettingsService
    this.settingsService.settings$.subscribe(settings => {
      debugger
      this.maxQuestions = settings.numberOfQuestions;
      this.questionTypes = settings.questionTypes;
    });
    this.loadData();
  }

  private formatNumberToThreeDigits(no: string): string {
    return no.toString().padStart(3, '0'); // Chuyển số thành chuỗi và thêm số 0 vào đầu cho đủ 3 chữ số
  }

  private getRandomQuestionType(): string {
    debugger
    const randomIndex = Math.floor(Math.random() * this.questionTypes.length);
    return this.questionTypes[randomIndex];
  }

  loadNextQuestion() {
    debugger
    this.settingQuestionType = this.getRandomQuestionType(); // Lấy loại câu hỏi ngẫu nhiên

    this.dataService.loadDataAndGenerateQuestion(this.settingQuestionType).subscribe(questionData => {
      if (this.settingQuestionType === 'name') {
        this.loadGeneratePokemonQuestion();
        return;
      }
      if (this.settingQuestionType === 'abilities' || this.settingQuestionType === 'types') {
        this.no = this.formatNumberToThreeDigits(questionData.no);
        this.question = questionData.question;
        this.answers = questionData.answers;
        this.name = questionData.name;
        this.types = questionData.types;
        this.evolutions = questionData.evolutions.length ? questionData.evolutions : ["しない"];
        this.correctAnswer = questionData.correctAnswer;
        this.questionType = questionData.questionType;
        this.hint = questionData.hint;

        if (this.questionType === 'types') {
          this.abilities = questionData.abilities;
        }

        this.form.patchValue({
          name: this.name,
          types: this.types?.join(', '),
          evolutions: this.evolutions?.join(', '),
          abilities: this.abilities?.join(', ')
        });
      } else {
        // Nếu câu hỏi không đúng loại, tải lại câu hỏi
        this.loadNextQuestion();
      }
    });
  }

  loadGeneratePokemonQuestion() {
    this.dataService.generatePokemonQuestion().then((questionData) => {
      debugger
      this.no = this.formatNumberToThreeDigits(questionData.no);
      console.log(this.no);
      this.question = questionData.question;
      this.answers = questionData.answers;
      this.name = questionData.correctAnswer;
      this.correctAnswer = questionData.correctAnswer;
      this.questionType = questionData.questionType;

    }).catch((err) => {
      console.error('Failed to generate question:', err);
    });
  }

  toggleHint() {
    this.showHint = !this.showHint; // Hiển thị hoặc ẩn gợi ý
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

  completeQuiz() {
    localStorage.setItem('quizResults', JSON.stringify(this.quizResults));
    this.router.navigate(['/results']);
  }

  restartGame() {
    this.score = 0;
    this.questionNumber = 1;
    this.quizResults = []; // Xóa kết quả cũ khi bắt đầu trò chơi mới
    this.loadData();
  }
}
