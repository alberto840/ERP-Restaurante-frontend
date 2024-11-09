import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacacionEditComponent } from './vacacion-edit.component';

describe('VacacionEditComponent', () => {
  let component: VacacionEditComponent;
  let fixture: ComponentFixture<VacacionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacacionEditComponent]
    });
    fixture = TestBed.createComponent(VacacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
