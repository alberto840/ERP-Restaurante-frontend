import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddiscountComponent } from './addiscount.component';

describe('AddiscountComponent', () => {
  let component: AddiscountComponent;
  let fixture: ComponentFixture<AddiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddiscountComponent]
    });
    fixture = TestBed.createComponent(AddiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
