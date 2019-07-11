import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScoresModel } from '../../models';
import { Store } from '@ngrx/store';
import { MathState, selectScoresModel } from '../../reducers';
import { Router } from '@angular/router';
import { playAgain } from '../../actions/question.actions';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  scoresModel$: Observable<ScoresModel>;
  constructor(private store: Store<MathState>, private router: Router) { }

  ngOnInit() {
    this.scoresModel$ = this.store.select(selectScoresModel);
  }

  playAgain() {
    this.store.dispatch(playAgain());
    this.router.navigate(['math', 'game']);
  }
}
