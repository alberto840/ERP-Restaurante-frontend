import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/inventual/models/empleado.model';
import { VacacionesModel } from 'src/app/inventual/models/vacaciones.model';
import { DialogData } from 'src/app/inventual/services/dialogs/dialogs.service';
import { GetEmpleado } from 'src/app/inventual/state-management/empleado/empleado.action';
import { EmpleadosState } from 'src/app/inventual/state-management/empleado/empleado.state';
import { UpdateVacacion } from 'src/app/inventual/state-management/vacacion/vacacion.action';
import { UsuarioEditComponent } from '../usuario-edit/usuario-edit.component';

@Component({
  selector: 'app-vacacion-edit',
  templateUrl: './vacacion-edit.component.html',
  styleUrls: ['./vacacion-edit.component.scss']
})
export class VacacionEditComponent implements OnInit {  
  hide = true;
  
  users$: Observable<UsuarioModel[]>; // Observable que contiene los users
  vacacion: VacacionesModel = {
    id: undefined,
    fechaInicio: new Date(),
    fechaFin: new Date(),
    aprobacion: false,
    usuariosId: 0
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<UsuarioEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.vacacion = { 
        id: data.vacacion.id,
        fechaInicio: new Date(data.vacacion.fechaInicio),
        fechaFin: new Date(data.vacacion.fechaFin),
        aprobacion: data.vacacion.aprobacion,
        usuariosId: data.vacacion.usuariosId
       };
      this.users$ = this.store.select(EmpleadosState.getEmpleados);
    }

  ngOnInit(): void {
    this.store.dispatch([new GetEmpleado()]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarVacacion() {
    if (!this.vacacion.usuariosId) {
      this.openSnackBar('Por favor, complete las fechas', 'Cerrar');
      return;
    }
    if (this.vacacion.fechaInicio > this.vacacion.fechaFin) {
      this.openSnackBar('La hora de inicio no puede ser mayor a la hora de fin', 'Cerrar');
      return;
    }
    this.store.dispatch(new UpdateVacacion(this.vacacion)).subscribe({
      next: () => {
        this.openSnackBar('Vacacion actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar Vacacion:', error);
        this.openSnackBar('No se pudo actualizar Vacacion', 'Cerrar');
      }
    });
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}