import { TestBed } from '@angular/core/testing';

import { MostrarDiagnosticoService } from './mostrar-diagnostico.service';

describe('MostrarDiagnosticoService', () => {
  let service: MostrarDiagnosticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostrarDiagnosticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
