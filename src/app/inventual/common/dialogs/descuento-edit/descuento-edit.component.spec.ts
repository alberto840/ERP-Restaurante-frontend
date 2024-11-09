import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentoEditComponent } from './descuento-edit.component';

describe('DescuentoEditComponent', () => {
  let component: DescuentoEditComponent;
  let fixture: ComponentFixture<DescuentoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescuentoEditComponent]
    });
    fixture = TestBed.createComponent(DescuentoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
