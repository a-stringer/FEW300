import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as savedScoresActions from '../actions/saved-scores.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SavedScoresModel } from '../reducers/saved-scores.reducer';
import { of } from 'rxjs';

@Injectable()
export class SavedScoresEffects {
  url: string;
  saveScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savedScoresActions.saveScore),
      map(a => a.payload),
      switchMap(org => this.http.post<SavedScoresModel>(this.url, ({ who: org.who, right: org.right, wrong: org.wrong } as ScoresCreate))
        .pipe(
          map(result => savedScoresActions.saveScoresSucceeded({ oldId: org.id, newScore: result }))
        )
      )
    ));   // LoadData action -> fo to the api, get the data. Turn that into -> loadDataSucceded.
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savedScoresActions.loadSavedScores),
      switchMap(() => this.http.get<ScoresDataFromServer>(this.url)
        .pipe(
          map(serverData => serverData.scores),
          map(scores => savedScoresActions.loadSavedScoresSucceeded({ scores }))
        )
      )
    )
  );
  constructor(private actions$: Actions, private http: HttpClient) {
    this.url = environment.savedScoresURL;
  }
}

interface ScoresDataFromServer {
  scores: SavedScoresModel[];
}
interface ScoresCreate {
  who: string;
  right: number;
  wrong: number;
}
