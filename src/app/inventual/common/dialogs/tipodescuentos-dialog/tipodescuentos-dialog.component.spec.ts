import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipodescuentosDialogComponent } from './tipodescuentos-dialog.component';

describe('TipodescuentosDialogComponent', () => {
  let component: TipodescuentosDialogComponent;
  let fixture: ComponentFixture<TipodescuentosDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipodescuentosDialogComponent]
    });
    fixture = TestBed.createComponent(TipodescuentosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
