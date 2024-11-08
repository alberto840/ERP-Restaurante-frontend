import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SucursalModel } from '../../models/sucursal.model';
import { SucursalEditComponent } from '../../common/dialogs/sucursal-edit/sucursal-edit.component';

export interface DialogData {
  sucursal: SucursalModel;

}

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(public dialog: MatDialog) {}

  //Funciones para editar
  actualizarSucursal(sucursal: SucursalModel): void {
    this.dialog.open(SucursalEditComponent, {
      data: {
        sucursal: sucursal
      },
    });
  }
}
