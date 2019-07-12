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
  on(actions.loadSavedScoresSucceeded, (state, action) => adapter.addAll(action.scores, state)),
  on(actions.saveScore, (state, action) => adapter.addOne(action.payload, state)),
  on(actions.saveScoresSucceeded, (state, action) => {
    const tempState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.newScore, tempState);
  }),
  on(actions.saveScoresFailed, (state, action) => adapter.removeOne(action.id, state))
);

export function savedScoresReducer(state: SavedScoresState | undefined, action: Action) {
  return reducer(state, action);
}
