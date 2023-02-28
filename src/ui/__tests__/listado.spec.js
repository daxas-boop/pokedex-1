import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js';

describe('actualizarTextoIndicePokemones()', () => {
  it('Deberia actualizar el indice de los pokemones', () => {
    document.body.innerHTML = '<div id="indice"></div>';
    const nuevoIndice = '0442';
    actualizarTextoIndicePokemones(nuevoIndice);
    expect(document.querySelector('#indice').textContent).toEqual(nuevoIndice);
  });
});

describe('mostrarListadoPokemones()', () => {
  it('Deberia crear un link por cada pokemon que recibe', () => {
    document.body.innerHTML = '<div id="indice"></div>';
    const pokemones = ['bulbasaur', 'pikachu'];
    mostrarListadoPokemones(pokemones);
    expect(document.querySelector('#indice').children.length).toEqual(pokemones.length);
  });

  it('Deberia llamar al callback con el nombre del pokemon si se clickea un pokemon', () => {
    document.body.innerHTML = '<div id="indice"></div>';
    const pokemones = ['bulbasaur', 'pikachu'];
    const callbackClick = jest.fn();
    mostrarListadoPokemones(pokemones, callbackClick);
    document.querySelector('#indice').children[0].click();
    expect(callbackClick).toBeCalledTimes(1);
    expect(callbackClick).toBeCalledWith(pokemones[0]);
  });
});
