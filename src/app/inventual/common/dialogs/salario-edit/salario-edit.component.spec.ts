import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarioEditComponent } from './salario-edit.component';

describe('SalarioEditComponent', () => {
  let component: SalarioEditComponent;
  let fixture: ComponentFixture<SalarioEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalarioEditComponent]
    });
    fixture = TestBed.createComponent(SalarioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
