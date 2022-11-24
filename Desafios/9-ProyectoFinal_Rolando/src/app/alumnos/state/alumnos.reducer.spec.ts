import {  alumnoReducer, alumnosInitialState } from './alumnos.reducer';

describe('Alumnos Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = alumnoReducer(alumnosInitialState, action);

      expect(result).toBe(alumnosInitialState);
    });
  });
});
