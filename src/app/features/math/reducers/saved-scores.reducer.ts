import { createReducer, Action, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as actions from '../actions/saved-scores.actions';

export interface SavedScoresModel {
  id: number;
  who: string;
  right: number;
  wrong: number;
  when: string;
}

export interface SavedScoresState extends EntityState<SavedScoresModel> {

}

export const adapter = createEntityAdapter<SavedScoresModel>();
const initialState: SavedScoresState = adapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(actions.loadSavedScoresSucceeded, (state, action) => adapter.addAll(action.scores, state))
);

export function savedScoresReducer(state: SavedScoresState | undefined, action: Action) {
  return reducer(state, action);
}
