import { usuarioReducer, usuariosInitialState } from './usuarios.reducer';

describe('Usuarios Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = usuarioReducer(usuariosInitialState, action);

      expect(result).toBe(usuariosInitialState);
    });
  });
});
