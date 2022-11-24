import { inscripcionReducer, inscripcionesInitialState } from './inscripciones.reducer';

describe('Inscripciones Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = inscripcionReducer(inscripcionesInitialState, action);

      expect(result).toBe(inscripcionesInitialState);
    });
  });
});
