import { Component, OnInit } from '@angular/core';
import { QuestionModel } from '../../models';
import { MathState, selectQuestionModel, selectAtEndOfQuestions, selectGameOverMan } from 'src/app/features/math/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { answerProvided, playAgain } from '../../actions/question.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  model$: Observable<QuestionModel>;
  atEnd$: Observable<boolean>;
  gameOver$: Observable<boolean>;
  constructor(private store: Store<MathState>, private router: Router) { }

  ngOnInit() {
    this.model$ = this.store.select(selectQuestionModel);
    this.atEnd$ = this.store.select(selectAtEndOfQuestions);
    this.gameOver$ = this.store.select(selectGameOverMan);
  }
  next(guessEl: HTMLInputElement) {
    const guess = guessEl.valueAsNumber;
    this.store.dispatch(answerProvided({ guess }));
    guessEl.value = '';
    guessEl.focus();
  }

  replay() {
    this.store.dispatch(playAgain());
  }
  finishGame(guessEl: HTMLInputElement) {
    const guess = guessEl.valueAsNumber;
    this.store.dispatch(answerProvided({ guess }));
    this.router.navigate(['math', 'scores']);
  }
}
