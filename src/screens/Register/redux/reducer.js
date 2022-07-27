import types from './types';

const initialState = {
  requesting: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.register:
      return { ...state, requesting: true };

    default:
      return state;
  }
};
