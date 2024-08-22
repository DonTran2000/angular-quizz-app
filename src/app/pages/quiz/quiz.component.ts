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
      this.maxQuestions = settings.numberOfQuestions;
    });
    this.loadData();
  }

  private formatNumberToThreeDigits(no: string): string {
    return no.toString().padStart(3, '0'); // Chuyển số thành chuỗi và thêm số 0 vào đầu cho đủ 3 chữ số
  }

  loadNextQuestion() {
    debugger
    this.dataService.loadDataAndGenerateQuestion().subscribe(questionData => {
      debugger
      if (questionData.no === undefined) {
        this.loadGeneratePokemonQuestion();
      }

      this.no = this.formatNumberToThreeDigits(questionData.no);
      this.question = questionData.question;
      this.answers = questionData.answers;
      this.name = questionData.name;
      this.types = questionData.types;
      this.evolutions = questionData.evolutions.length ? questionData.evolutions : ["しない"];
      this.correctAnswer = questionData.correctAnswer;
      this.questionType = questionData.questionType;

      // vì questionType === 'abilities' không có abilities, nên if
      if (this.questionType === 'types') {
        this.abilities = questionData.abilities;
      }

      if (this.questionType === 'abilities' || this.questionType === 'name') {
        this.hint = questionData.hint;
      }

      this.form.patchValue({
        name: this.name,
        types: this.types?.join(', '),
        evolutions: this.evolutions?.join(', '),
        abilities: this.abilities?.join(', ')
      });
    });
  }

  loadGeneratePokemonQuestion() {
    this.dataService.generatePokemonQuestion().then((questionData) => {
      debugger
      this.no = questionData.no;

      this.question = questionData.question;
      this.answers = questionData.answers;
      this.name = questionData.correctAnswer;
      this.correctAnswer = questionData.correctAnswer;
      this.questionType = questionData.questionType;
      this.hint = questionData.hint;

      this.form.patchValue({
        name: this.name || '',
        types: this.types?.join(', ') || '',
        evolutions: this.evolutions?.join(', ') || '',
        abilities: this.abilities?.join(', ') || ''
      });
    }).catch((err) => {
      console.error('Failed to generate question:', err);
      // Thực hiện xử lý lỗi tùy theo yêu cầu của ứng dụng
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
