import { createAction, props } from '@ngrx/store';
import { SavedScoresModel } from '../reducers/saved-scores.reducer';

export const loadSavedScores = createAction(
  '[math] load saved scores'
);
export const loadSavedScoresSucceeded = createAction(
  '[math] load saved scores succeeded',
  props<{ scores: SavedScoresModel[] }>()
);
