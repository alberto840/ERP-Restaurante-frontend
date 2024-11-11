import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SucursalModel } from '../../models/sucursal.model';
import { SucursalEditComponent } from '../../common/dialogs/sucursal-edit/sucursal-edit.component';
import { ContratoModel } from '../../models/contrato.model';
import { ContratoEditComponent } from '../../common/dialogs/contrato-edit/contrato-edit.component';
import { UsuarioModel } from '../../models/empleado.model';
import { UsuarioEditComponent } from '../../common/dialogs/usuario-edit/usuario-edit.component';
import { VacacionesModel } from '../../models/vacaciones.model';
import { VacacionEditComponent } from '../../common/dialogs/vacacion-edit/vacacion-edit.component';
import { DescuentosModel } from '../../models/descuentos.model';
import { DescuentoEditComponent } from '../../common/dialogs/descuento-edit/descuento-edit.component';
import { BonosModel } from '../../models/bonos.model';
import { BonoEditComponent } from '../../common/dialogs/bono-edit/bono-edit.component';
import { TurnoModel } from '../../models/horarios.model';
import { TurnoEditComponent } from '../../common/dialogs/turno-edit/turno-edit.component';
import { SalariosModel } from '../../models/salarios.model';
import { SalarioEditComponent } from '../../common/dialogs/salario-edit/salario-edit.component';

export interface DialogData {
  sucursal: SucursalModel;
  contrato: ContratoModel;
  usuario: UsuarioModel;
  vacacion: VacacionesModel;
  descuento: DescuentosModel;
  bono: BonosModel;
  turno: TurnoModel;
  salario: SalariosModel;
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

  actualizarVacacione(vacacion: VacacionesModel): void {
    this.dialog.open(VacacionEditComponent, {
      data: {
        vacacion: vacacion
      },
    });
  }

  actualizarDescuento(descuento: DescuentosModel): void {
    this.dialog.open(DescuentoEditComponent, {
      data: {
        descuento: descuento
      },
    });
  }

  actualizarBono(bono: BonosModel): void {
    this.dialog.open(BonoEditComponent, {
      data: {
        bono: bono
      },
    });
  }

  actualizarTurno(turno: TurnoModel): void {
    this.dialog.open(TurnoEditComponent, {
      data: {
        turno: turno
      },
    });
  }

  actualizarSalario(salario: SalariosModel): void {
    this.dialog.open(SalarioEditComponent, {
      data: {
        salario: salario
      },
    });
  }
}
