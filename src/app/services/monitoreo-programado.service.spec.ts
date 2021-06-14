import { TestBed } from '@angular/core/testing';

import { MonitoreoProgramadoService } from './monitoreo-programado.service';

describe('MonitoreoProgramadoService', () => {
  let service: MonitoreoProgramadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoreoProgramadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
