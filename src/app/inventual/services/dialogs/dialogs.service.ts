import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SucursalModel } from '../../models/sucursal.model';
import { SucursalEditComponent } from '../../common/dialogs/sucursal-edit/sucursal-edit.component';
import { ContratoModel } from '../../models/contrato.model';
import { ContratoEditComponent } from '../../common/dialogs/contrato-edit/contrato-edit.component';
import { UsuarioModel } from '../../models/empleado.model';
import { UsuarioEditComponent } from '../../common/dialogs/usuario-edit/usuario-edit.component';

export interface DialogData {
  sucursal: SucursalModel;
  contrato: ContratoModel;
  usuario: UsuarioModel;
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

  actualizarContrato(contrato: ContratoModel): void {
    this.dialog.open(ContratoEditComponent, {
      data: {
        contrato: contrato
      },
    });
  }

  actualizarUsuario(usuario: UsuarioModel): void {
    this.dialog.open(UsuarioEditComponent, {
      data: {
        usuario: usuario
      },
    });
  }
}
