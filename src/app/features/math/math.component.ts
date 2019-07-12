import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MathState, selectHideScores } from './reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-math',
  templateUrl: './math.component.html',
  styleUrls: ['./math.component.scss']
})
export class MathComponent implements OnInit {

  hideScores$: Observable<boolean>;
  constructor(private store: Store<MathState>) { }

  ngOnInit() {
    this.hideScores$ = this.store.select(selectHideScores);
  }

}
