import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonoEditComponent } from './bono-edit.component';

describe('BonoEditComponent', () => {
  let component: BonoEditComponent;
  let fixture: ComponentFixture<BonoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BonoEditComponent]
    });
    fixture = TestBed.createComponent(BonoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
