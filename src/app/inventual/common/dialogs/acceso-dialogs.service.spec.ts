import { TestBed } from '@angular/core/testing';

import { AccesoDialogsService } from './acceso-dialogs.service';

describe('AccesoDialogsService', () => {
  let service: AccesoDialogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesoDialogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
