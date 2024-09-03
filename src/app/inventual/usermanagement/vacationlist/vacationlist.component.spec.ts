import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationlistComponent } from './vacationlist.component';

describe('VacationlistComponent', () => {
  let component: VacationlistComponent;
  let fixture: ComponentFixture<VacationlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacationlistComponent]
    });
    fixture = TestBed.createComponent(VacationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
