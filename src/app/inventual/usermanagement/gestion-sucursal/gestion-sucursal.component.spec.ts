import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSucursalComponent } from './gestion-sucursal.component';

describe('GestionSucursalComponent', () => {
  let component: GestionSucursalComponent;
  let fixture: ComponentFixture<GestionSucursalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionSucursalComponent]
    });
    fixture = TestBed.createComponent(GestionSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
