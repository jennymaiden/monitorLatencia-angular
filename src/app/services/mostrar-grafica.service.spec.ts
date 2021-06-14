import { TestBed } from '@angular/core/testing';

import { MostrarGraficaService } from './mostrar-grafica.service';

describe('MostrarGraficaService', () => {
  let service: MostrarGraficaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostrarGraficaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
