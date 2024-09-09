import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TipodescuentosDialogComponent } from './tipodescuentos-dialog/tipodescuentos-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AccesoDialogsService {

  constructor(public dialog: MatDialog) {}

  crearNuevoTipoDialog(): void {    
    this.dialog.open(TipodescuentosDialogComponent);
  }
}
