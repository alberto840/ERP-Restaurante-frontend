import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { TurnoModel } from 'src/app/inventual/models/horarios.model';
import { DialogData } from 'src/app/inventual/services/dialogs/dialogs.service';
import { UpdateTurno } from 'src/app/inventual/state-management/turno/turno.action';
import { BonoEditComponent } from '../bono-edit/bono-edit.component';

@Component({
  selector: 'app-turno-edit',
  templateUrl: './turno-edit.component.html',
  styleUrls: ['./turno-edit.component.scss']
})
export class TurnoEditComponent implements OnInit {  
  hide = true;
  checked = false;
  disabled = false;
  turno: TurnoModel = {
    id: 0,
    nombre: '',
    descripcion: '',
    horaInicio: new Date(),
    horaFin: new Date(),
    dia: ''
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<BonoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.turno = { ...data.turno };
    }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarBono() {
    if (!this.turno.nombre || !this.turno.descripcion || !this.turno.horaInicio || !this.turno.horaFin || !this.turno.dia) {
      this.openSnackBar('Debe completar todos los campos', 'Cerrar');
      return;
    }
    if (this.turno.nombre.length < 3 || this.turno.nombre.length > 50) {
      this.openSnackBar('El nombre tiene que estar entre 3 y 50 caracteres', 'Cerrar');
      return;
    }
    if (this.turno.descripcion.length < 3 || this.turno.descripcion.length > 50) {
      this.openSnackBar('La descripción tiene que estar entre 3 y 50 caracteres', 'Cerrar');
      return;
    }
    if (this.turno.horaInicio > this.turno.horaFin) {
      this.openSnackBar('La hora de inicio no puede ser mayor a la hora de fin', 'Cerrar');
      return;
    }
    
    this.store.dispatch(new UpdateTurno(this.turno)).subscribe({
      next: () => {
        this.openSnackBar('Turno actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar turno:', error);
        this.openSnackBar('No se pudo actualizar Turno', 'Cerrar');
      }
    });
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}