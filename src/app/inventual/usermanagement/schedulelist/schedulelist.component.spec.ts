import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulelistComponent } from './schedulelist.component';

describe('SchedulelistComponent', () => {
  let component: SchedulelistComponent;
  let fixture: ComponentFixture<SchedulelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulelistComponent]
    });
    fixture = TestBed.createComponent(SchedulelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
