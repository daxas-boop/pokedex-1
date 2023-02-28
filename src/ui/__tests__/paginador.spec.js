import mostrarPaginador, { manejarCambioPagina } from '../paginador.js';

describe('mostrarPaginador()', () => {
  const TOTAL_POKEMONES = 200;
  const PAGINA_ACTUAL = 1;
  const URL_ANTERIOR = 'htpp://anterior.com/';
  const URL_SIGUIENTE = 'http://siguiente.com/';
  const callbackClick = jest.fn();

  beforeAll(() => {
    document.body.innerHTML = '<div id="paginador"></div>';
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Deberia crear un boton para ir atras con la URL_ANTERIOR como href', () => {
    mostrarPaginador(TOTAL_POKEMONES, PAGINA_ACTUAL, URL_SIGUIENTE, URL_ANTERIOR, callbackClick);
    const $botonAnterior = document.querySelector('#paginador > li > a');
    expect($botonAnterior.textContent).toEqual('Anterior');
    expect($botonAnterior.href).toEqual(URL_ANTERIOR);
  });

  it('Deberia poner el boton para ir atras como deshabilitado si NO se le pasa URL_ANTERIOR', () => {
    mostrarPaginador(TOTAL_POKEMONES, PAGINA_ACTUAL, URL_SIGUIENTE, '', callbackClick);
    const $botonAnterior = document.querySelector('#paginador > li > a');
    expect($botonAnterior.parentNode.className).toContain('disabled');
  });

  it('Deberia crear un boton para ir adelante con la URL_SIGUIENTE como href', () => {
    mostrarPaginador(TOTAL_POKEMONES, PAGINA_ACTUAL, URL_SIGUIENTE, URL_ANTERIOR, callbackClick);
    const $botonSiguiente = document.querySelector('#paginador').lastElementChild.lastChild;
    expect($botonSiguiente.textContent).toEqual('Siguiente');
    expect($botonSiguiente.href).toEqual(URL_SIGUIENTE);
  });

  it('Deberia poner el boton para ir adelante como deshabilitado si NO se le pasa URL_SIGUIENTE', () => {
    mostrarPaginador(TOTAL_POKEMONES, PAGINA_ACTUAL, '', URL_ANTERIOR, callbackClick);
    const $botonSiguiente = document.querySelector('#paginador').lastElementChild.lastChild;
    expect($botonSiguiente.parentNode.className).toContain('disabled');
  });

  it('Deberia crear los numeros de la paginacion', () => {
    mostrarPaginador(TOTAL_POKEMONES, PAGINA_ACTUAL, URL_SIGUIENTE, URL_ANTERIOR, callbackClick);
    const POKEMONES_POR_PAGINA = 20;
    const cantidadDePaginas = Math.ceil(TOTAL_POKEMONES / POKEMONES_POR_PAGINA);
    const botonesAtrasYAdelante = 2;
    expect(document.querySelector('#paginador').childNodes.length).toEqual(cantidadDePaginas + botonesAtrasYAdelante);
    for (let i = 0; i < cantidadDePaginas; i += 1) {
      expect(document.querySelector('#paginador').textContent).toContain(i + 1);
    }
  });

  it('Deberia llamar al callback al hacer click en un boton', () => {
    mostrarPaginador(TOTAL_POKEMONES, PAGINA_ACTUAL, URL_SIGUIENTE, URL_ANTERIOR, callbackClick);
    const $botonAnterior = document.querySelector('#paginador > li > a');
    $botonAnterior.click();
    expect(callbackClick).toBeCalledTimes(1);
    const $numeroPagina = document.querySelector('#paginador').childNodes[1].childNodes[0];
    $numeroPagina.click();
    expect(callbackClick).toBeCalledTimes(2);
    const $botonSiguiente = document.querySelector('#paginador').lastElementChild.lastChild;
    $botonSiguiente.click();
    expect(callbackClick).toBeCalledTimes(3);
  });

  it('Deberia llamar al callback con el numero de pagina si un numero es clickeado', () => {
    mostrarPaginador(TOTAL_POKEMONES, PAGINA_ACTUAL, URL_SIGUIENTE, URL_ANTERIOR, callbackClick);
    const $numeroPagina = document.querySelector('#paginador').childNodes[1].childNodes[0];
    $numeroPagina.click();
    expect(callbackClick).toBeCalledWith(Number($numeroPagina.dataset.pagina));
  });

  it('Deberia llamar al callback con el href si el boton anterior es clickeado', () => {
    mostrarPaginador(TOTAL_POKEMONES, PAGINA_ACTUAL, URL_SIGUIENTE, URL_ANTERIOR, callbackClick);
    const $botonAnterior = document.querySelector('#paginador > li > a');
    $botonAnterior.click();
    expect(callbackClick).toBeCalledWith($botonAnterior.href);
  });

  it('Deberia llamar al callback con el href si el boton siguiente es clickeado', () => {
    mostrarPaginador(TOTAL_POKEMONES, PAGINA_ACTUAL, URL_SIGUIENTE, URL_ANTERIOR, callbackClick);
    const $botonSiguiente = document.querySelector('#paginador').lastElementChild.lastChild;
    $botonSiguiente.click();
    expect(callbackClick).toBeCalledWith($botonSiguiente.href);
  });

  it('Deberia permitir llamar a la funcion sin un callback', () => {
    mostrarPaginador(TOTAL_POKEMONES, PAGINA_ACTUAL, URL_SIGUIENTE, URL_ANTERIOR);
    const $botonAnterior = document.querySelector('#paginador > li > a');
    expect($botonAnterior).toBeDefined();
    $botonAnterior.click();
  });
});

describe('manejarCambioPagina()', () => {
  const callback = jest.fn();
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Deberia llamar al callback con el href si existe', () => {
    const mockEventConHref = {
      target: {
        dataset: {
          pagina: '15',
        },
        getAttribute: jest.fn((attributeName) => {
          const attributes = { href: 'http://mockpage.com' };
          return attributes[attributeName];
        }),
      },
      preventDefault: jest.fn(),
    };
    manejarCambioPagina(mockEventConHref, callback);
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('http://mockpage.com');
  });

  it('Deberia llamar al callback con el numero de pagina si NO hay href', () => {
    const mockEventSinHref = {
      target: {
        dataset: {
          pagina: '15',
        },
        getAttribute: jest.fn((attributeName) => {
          const attributes = { href: '#' };
          return attributes[attributeName];
        }),
      },
      preventDefault: jest.fn(),
    };
    manejarCambioPagina(mockEventSinHref, callback);
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(15);
  });

  it('Deberia permitir llamar a la funcion sin un callback', () => {
    const mockEvent = {
      target: {
        dataset: {
          pagina: '',
        },
        getAttribute: jest.fn(),
      },
      preventDefault: jest.fn(),
    };
    manejarCambioPagina(mockEvent);
  });
});
