import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DescuentosModel } from 'src/app/inventual/models/descuentos.model';
import { UsuarioModel } from 'src/app/inventual/models/empleado.model';
import { SalariosModel } from 'src/app/inventual/models/salarios.model';
import { DialogData } from 'src/app/inventual/services/dialogs/dialogs.service';
import { GetDescuento } from 'src/app/inventual/state-management/descuentos/descuento.action';
import { DiscountsState } from 'src/app/inventual/state-management/descuentos/descuento.state';
import { GetEmpleado } from 'src/app/inventual/state-management/empleado/empleado.action';
import { EmpleadosState } from 'src/app/inventual/state-management/empleado/empleado.state';
import { UpdateSalario } from 'src/app/inventual/state-management/salario/salario.action';
import { ContratoEditComponent } from '../contrato-edit/contrato-edit.component';

@Component({
  selector: 'app-salario-edit',
  templateUrl: './salario-edit.component.html',
  styleUrls: ['./salario-edit.component.scss']
})
export class SalarioEditComponent implements OnInit {
  usuarios$: Observable<UsuarioModel[]>;
  usuarios: UsuarioModel[] = [];
  descuentos$: Observable<DescuentosModel[]>;
  descuentos: DescuentosModel[] = [];
  salario: SalariosModel = {
    id: undefined,
    salario: 0,
    fechapago: new Date(),
    descuentoId: 0,
    usuariosId: 0
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<ContratoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.salario = { ...data.salario };
      this.usuarios$ = this.store.select(EmpleadosState.getEmpleados);
      this.descuentos$ = this.store.select(DiscountsState.getDiscounts);
    }

  ngOnInit(): void {
    this.store.dispatch([new GetEmpleado(), new GetDescuento()]);

    this.usuarios$.subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarSalario() {
    if (!this.salario.salario || !this.salario.fechapago || !this.salario.descuentoId || !this.salario.usuariosId) {
      this.openSnackBar('Debe llenar todos los campos', 'Cerrar');
      return;
    }
    if(this.salario.salario < 0){
      this.openSnackBar('El salario no puede ser negativo', 'Cerrar');
      return;
    }

    this.store.dispatch(new UpdateSalario(this.salario)).subscribe({
      next: () => {
        console.log('Salario actualizado exitosamente');
        this.openSnackBar('Salario actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar Salario:', error);
        this.openSnackBar('Salario no se pudo actualizar', 'Cerrar');
      }
    });
    this.salario = {
      id: undefined,
      salario: 0,
      fechapago: new Date(),
      descuentoId: 0,
      usuariosId: 0
    };
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}