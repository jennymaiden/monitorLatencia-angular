import { TestBed } from '@angular/core/testing';

import { ListarAlertaService } from './listar-alerta.service';

describe('ListarAlertaService', () => {
  let service: ListarAlertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarAlertaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
