import { sesionReducer, sesionInitialState } from './sesion.reducer';

describe('Sesion Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = sesionReducer(sesionInitialState, action);

      expect(result).toBe(sesionInitialState);
    });
  });
});
