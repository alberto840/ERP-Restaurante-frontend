import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { ContratoModel } from 'src/app/inventual/models/contrato.model';
import { SucursalEditComponent } from '../sucursal-edit/sucursal-edit.component';
import { DialogData } from 'src/app/inventual/services/dialogs/dialogs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetContrato, UpdateContrato } from 'src/app/inventual/state-management/contrato/contrato.action';
import { EmpleadosState } from 'src/app/inventual/state-management/empleado/empleado.state';
import { UsuarioModel } from 'src/app/inventual/models/empleado.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contrato-edit',
  templateUrl: './contrato-edit.component.html',
  styleUrls: ['./contrato-edit.component.scss']
})
export class ContratoEditComponent implements OnInit {
  usuarios$: Observable<UsuarioModel[]>;
  usuarios: UsuarioModel[] = [];
  contrato: ContratoModel = {
    id: 0,
    fechaInicio: new Date(),
    fechaConclusion: new Date(),
    fechaContrato: new Date(),
    identificador: 0,
    usuariosId: 0
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<SucursalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.contrato = { ...data.contrato };
      this.usuarios$ = this.store.select(EmpleadosState.getEmpleados);
    }

  ngOnInit(): void {
    this.store.dispatch(new GetContrato());

    this.usuarios$.subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarContrato() {
    if (!this.contrato.fechaInicio || !this.contrato.fechaConclusion || !this.contrato.fechaContrato || !this.contrato.identificador || !this.contrato.usuariosId) {
      this.openSnackBar('Por favor complete todos los campos', 'Cerrar');
      return;
    }
    this.store.dispatch(new UpdateContrato(this.contrato)).subscribe({
      next: () => {
        this.openSnackBar('contrato actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar contrato:', error);
        this.openSnackBar('No se pudo actualizar contrato', 'Cerrar');
      }
    });
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}