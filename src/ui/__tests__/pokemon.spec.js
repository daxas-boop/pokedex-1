import mostrarPokemon from '../pokemon.js';
import fixture from './pokedex.fixture.js';

const mockPokemon = {
  id: 1,
  nombre: 'bulbasaur',
  foto: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
  tipos: ['planta', 'veneno'],
  habilidades: ['hab1', 'hab2'],
  movimientos: [
    { nombre: 'mov1', versiones: ['ver1', 'ver2'] },
    { nombre: 'mov2', versiones: ['ver3', 'ver4'] },
  ],
};

beforeAll(() => {
  document.body.innerHTML = fixture;
  mostrarPokemon(mockPokemon);
});

describe('mostrarPokemon()', () => {
  it('Deberia remover el texto de ayuda al mostrar un pokemon', () => {
    expect(document.querySelector('#ayuda').textContent).toBe('');
  });

  it('Deberia mostrar la imagen del pokemon', () => {
    expect(document.querySelector('#pokemon-imagen').src).toBe(mockPokemon.foto);
  });

  it('Deberia mostrar el nombre del pokemon', () => {
    expect(document.querySelector('#pokemon-nombre').textContent).toBe(mockPokemon.nombre);
  });

  it('Deberia mostrar el id del pokemon', () => {
    expect(document.querySelector('#pokemon-id').textContent).toBe(mockPokemon.id.toString());
  });

  it('Deberia mostrar los tipos del pokemon', () => {
    const $tipos = document.querySelector('#tipos').childNodes;
    $tipos.forEach(($tipo, i) => {
      expect($tipo.textContent).toEqual(mockPokemon.tipos[i]);
    });
  });

  it('Deberia mostrar las habilidades del pokemon', () => {
    const $habilidades = document.querySelector('#habilidades').childNodes;
    $habilidades.forEach(($habilidad, i) => {
      expect($habilidad.textContent).toEqual(mockPokemon.habilidades[i]);
    });
  });

  it('Deberia mostrar los movimientos del pokemon', () => {
    const $movimientos = document.querySelector('#movimientos');
    for (let i = 0; i < mockPokemon.movimientos.length; i += 1) {
      for (let j = 0; j < mockPokemon.movimientos[i].versiones.length; j += 1) {
        expect($movimientos.textContent).toContain(mockPokemon.movimientos[i].versiones[j]);
      }
    }
  });
});
