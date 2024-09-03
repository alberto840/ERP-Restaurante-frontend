import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountlistComponent } from './discountlist.component';

describe('DiscountlistComponent', () => {
  let component: DiscountlistComponent;
  let fixture: ComponentFixture<DiscountlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountlistComponent]
    });
    fixture = TestBed.createComponent(DiscountlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
