import { TestBed } from '@angular/core/testing';

import { VacacionService } from './vacacion.service';

describe('VacacionService', () => {
  let service: VacacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
