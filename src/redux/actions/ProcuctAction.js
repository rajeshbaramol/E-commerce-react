import * as actionTypes from '../ActionType'
export const resetState = () => ({
    type: actionTypes.RESET_STATE,
});

export const dataChange = (params) => ({
    type: actionTypes.ON_DATA_CHANGE,
    params,
});

export const onChange = (params) => ({
    type: actionTypes.ON_CHANGE,
    params,
});