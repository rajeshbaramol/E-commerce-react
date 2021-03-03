import defaultState from './defaultState';
import * as actionTypes from '../../ActionType';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ON_CHANGE:
      return state
        .set(action.params.name, action.params.value)
        .set('emailError', action.params.emailError)
        .set('passwordError', action.params.passwordError);
    case actionTypes.ON_DATA_CHANGE:
      return state.set(action.params.name, action.params.value);
    default:
      return state;
  }
};
