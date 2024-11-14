import { TestBed } from '@angular/core/testing';

import { PermisosAppService } from './permisos-app.service';

describe('PermisosAppService', () => {
  let service: PermisosAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisosAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
