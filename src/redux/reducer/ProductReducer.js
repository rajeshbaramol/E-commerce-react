import { fromJS } from 'immutable';
import * as actionTypes from '../ActionType';
const defaultState = fromJS({ productList: [], categories: [], cart: [],priceBetween:[0,100] });
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ON_CHANGE:
      return state.set(action.params.name, action.params.value);
    case actionTypes.ON_DATA_CHANGE:
      return state.set(action.params.name, action.params.value);
    default:
      return state;
  }
};
