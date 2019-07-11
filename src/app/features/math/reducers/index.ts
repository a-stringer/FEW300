export const featureName = 'mathFeature';
import * as fromQuestions from './questions.reducer';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionModel } from '../models';

export interface MathState {
  questions: fromQuestions.MathQuestionsState;
}

export const reducers = {
  questions: fromQuestions.reducer
};


// 1. Create a feature selector (that knows how to find the feature in the state)
const selectMathFeature = createFeatureSelector<MathState>(featureName);

// 2. Create a selector for each "branch" of the MathState (e.g., questions)

const selectQuestionsBranch = createSelector(selectMathFeature, m => m.questions);

// 3. Selectors that are "helpers" to get the data you need for step 4.
const selectCurrentQuestionId = createSelector(selectQuestionsBranch, q => q.currentQuestionId);
// Object Destructuring - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const {
  selectTotal: selectTotalNumberOfQuestions,
  selectEntities: selectQuestionEntities } = fromQuestions.adapter.getSelectors(selectQuestionsBranch);

const selectSelectedQuestion = createSelector(
  selectQuestionEntities,
  selectCurrentQuestionId,
  (entities, current) => entities[current]
);
// 4. Create a selector for each component model

// TODO Create a selector that returns a QuestionModel
// current id, how many total, question for the current question

export const selectQuestionModel = createSelector(
  selectTotalNumberOfQuestions,
  selectSelectedQuestion,
  (total, selected) => {
    return {
      num: selected.id,
      of: total,
      question: selected.question
    } as QuestionModel;
  }
);

export const selectAtEndOfQuestions = createSelector(
  selectTotalNumberOfQuestions,
  selectCurrentQuestionId,
  (total, current) => total === current
);

export const selectGameOverMan = createSelector(
  selectQuestionsBranch,
  q => q.missedQuestions.length === 3
);
