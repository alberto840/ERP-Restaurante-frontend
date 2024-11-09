import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DescuentosModel } from 'src/app/inventual/models/descuentos.model';
import { UsuarioModel } from 'src/app/inventual/models/empleado.model';
import { DialogData } from 'src/app/inventual/services/dialogs/dialogs.service';
import { UpdateDescuento } from 'src/app/inventual/state-management/descuentos/descuento.action';
import { GetEmpleado } from 'src/app/inventual/state-management/empleado/empleado.action';
import { EmpleadosState } from 'src/app/inventual/state-management/empleado/empleado.state';
import { ContratoEditComponent } from '../contrato-edit/contrato-edit.component';

@Component({
  selector: 'app-descuento-edit',
  templateUrl: './descuento-edit.component.html',
  styleUrls: ['./descuento-edit.component.scss']
})
export class DescuentoEditComponent implements OnInit {
  usuarios$: Observable<UsuarioModel[]>;
  usuarios: UsuarioModel[] = [];
  descuento: DescuentosModel = {
    id: 0,
    tipoDescuento: '',
    monto: 0,
    fecha: new Date(),
    justificacion: ''
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<ContratoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.descuento = { 
        id: data.descuento.id,
        tipoDescuento: data.descuento.tipoDescuento,
        monto: data.descuento.monto,
        fecha: new Date(data.descuento.fecha),
        justificacion: data.descuento.justificacion
       };
      this.usuarios$ = this.store.select(EmpleadosState.getEmpleados);
    }

  ngOnInit(): void {
    this.store.dispatch([new GetEmpleado()]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarDescuento() {
    if (!this.descuento.monto || !this.descuento.justificacion) {
      this.openSnackBar('Por favor complete todos los campos', 'Cerrar');
      return;
    }
    if(this.descuento.monto < 1) {
      this.openSnackBar('El monto debe ser positivo', 'Cerrar');
      return;
    }
    this.store.dispatch(new UpdateDescuento(this.descuento)).subscribe({
      next: () => {
        this.openSnackBar('Descuento actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar Descuento:', error);
        this.openSnackBar('No se pudo actualizar Descuento', 'Cerrar');
      }
    });
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}