import { TestBed } from '@angular/core/testing';
import { CarroService } from './carro.service';


describe('CarroService', () => {
  let service: CarroService;

  beforeEach(() => {
    localStorage.clear(); // Limpia el localStorage antes de cada prueba
    TestBed.configureTestingModule({
      providers: [CarroService],
    });
    service = TestBed.inject(CarroService);
  });

  afterEach(() => {
    localStorage.clear(); // Limpia el localStorage después de cada prueba
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería agregar un producto al carro', () => {
    const producto = { id: 1, nombre: 'Producto 1', precio: 100 };
    service.agregarAlCarro(producto);

    const items = service.getItems();
    expect(items.length).toBe(1);
    expect(items[0]).toEqual({ ...producto, cantidad: 1 });
  });

  it('debería eliminar un producto del carro', () => {
    const producto = { id: 1, nombre: 'Producto 1', precio: 100 };
    service.agregarAlCarro(producto);

    service.borrarDeCarro(producto);
    const items = service.getItems();
    expect(items.length).toBe(0);
  });

  it('debería aumentar la cantidad de un producto en el carro', () => {
    const producto = { id: 1, nombre: 'Producto 1', precio: 100 };
    service.agregarAlCarro(producto);

    service.sumarCantidad(1);
    const items = service.getItems();
    expect(items[0].cantidad).toBe(2);
  });

  it('debería disminuir la cantidad de un producto en el carro', () => {
    const producto = { id: 1, nombre: 'Producto 1', precio: 100 };
    service.agregarAlCarro(producto);

    service.sumarCantidad(1); // Cantidad inicial: 2
    service.restarCantidad(1); // Cantidad final: 1
    const items = service.getItems();
    expect(items[0].cantidad).toBe(1);
  });
  

  it('debería calcular el total de la compra', () => {
    const producto1 = { id: 1, nombre: 'Producto 1', precio: 100 };
    const producto2 = { id: 2, nombre: 'Producto 2', precio: 200 };
  
    // Agrega productos al carrito
    service.agregarAlCarro(producto1); // Cantidad inicial: 1
    service.agregarAlCarro(producto2); // Cantidad inicial: 1
  
    // Incrementa manualmente la cantidad del Producto 1
    service.sumarCantidad(1); // Producto 1: Cantidad ahora es 2
  
    // Comprueba los resultados
    const total = service.getTotal();
    expect(total).toBe(400); // Producto 1: 100*1, Producto 2: 200*1

  });
  
  
  

  it('debería guardar y recuperar datos de localStorage', () => {
    const producto = { id: 1, nombre: 'Producto 1', precio: 100 };
    service.agregarAlCarro(producto);

    // Simula recargar la página
    const nuevoServicio = TestBed.inject(CarroService);
    const items = nuevoServicio.getItems();
    expect(items.length).toBe(1);
    expect(items[0]).toEqual({ ...producto, cantidad: 1 });
  });
});
