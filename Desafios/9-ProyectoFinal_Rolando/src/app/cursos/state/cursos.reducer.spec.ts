import { cursoReducer, cursosInitialState } from './cursos.reducer';

describe('Cursos Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = cursoReducer(cursosInitialState, action);

      expect(result).toBe(cursosInitialState);
    });
  });
});
