import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryhistoryComponent } from './salaryhistory.component';

describe('SalaryhistoryComponent', () => {
  let component: SalaryhistoryComponent;
  let fixture: ComponentFixture<SalaryhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaryhistoryComponent]
    });
    fixture = TestBed.createComponent(SalaryhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
