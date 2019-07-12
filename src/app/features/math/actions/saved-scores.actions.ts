import { createAction, props } from '@ngrx/store';
import { SavedScoresModel as SavedScoreModel } from '../reducers/saved-scores.reducer';

export const loadSavedScores = createAction(
  '[math] load saved scores'
);
export const loadSavedScoresSucceeded = createAction(
  '[math] load saved scores succeeded',
  props<{ scores: SavedScoreModel[] }>()
);

let currentId = 50_000;
export const saveScore = createAction(
  '[math] save score',
  (right: number, wrong: number) => {
    const newScore: SavedScoreModel = {
      right,
      wrong,
      who: 'Alec',
      when: new Date().toISOString(),
      id: currentId++
    };
    return { payload: newScore };
  }
);
export const saveScoresSucceeded = createAction(
  '[math] save score succeeded',
  props<{ oldId: number, newScore: SavedScoreModel }>()
);
export const saveScoresFailed = createAction(
  '[math] save score failed',
  props<{ id: number, reason: string }>()
);
