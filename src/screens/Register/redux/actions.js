import types from './types';

export const register = data => ({
  type: types.register,
  data
});
