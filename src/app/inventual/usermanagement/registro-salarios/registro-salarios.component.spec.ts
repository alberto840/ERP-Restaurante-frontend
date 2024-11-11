import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSalariosComponent } from './registro-salarios.component';

describe('RegistroSalariosComponent', () => {
  let component: RegistroSalariosComponent;
  let fixture: ComponentFixture<RegistroSalariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroSalariosComponent]
    });
    fixture = TestBed.createComponent(RegistroSalariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
