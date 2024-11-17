import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/inventual/models/empleado.model';
import { TurnoModel, HorarioModel } from 'src/app/inventual/models/horarios.model';
import { DialogData } from 'src/app/inventual/services/dialogs/dialogs.service';
import { GetEmpleado } from 'src/app/inventual/state-management/empleado/empleado.action';
import { EmpleadosState } from 'src/app/inventual/state-management/empleado/empleado.state';
import { AddHorario } from 'src/app/inventual/state-management/horario/horario.action';
import { GetPermisosRol } from 'src/app/inventual/state-management/permisos-rol/permisos-rol.action';
import { GetTurno } from 'src/app/inventual/state-management/turno/turno.action';
import { TurnoState } from 'src/app/inventual/state-management/turno/turno.state';
import { ContratoEditComponent } from '../contrato-edit/contrato-edit.component';

@Component({
  selector: 'app-horario-add',
  templateUrl: './horario-add.component.html',
  styleUrls: ['./horario-add.component.scss']
})
export class HorarioAddComponent implements OnInit {
  
  usuarios$: Observable<UsuarioModel[]>; // Observable que contiene los users
  turnos$: Observable<TurnoModel[]>; // Observable que contiene los users
  turnos: TurnoModel[] = [];
  horario: HorarioModel = {
    id: 0,
    diaSemana: new Date(),
    usuariosId: 0,
    turnoId: 0
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<ContratoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.horario.usuariosId = data.userId;
      this.usuarios$ = this.store.select(EmpleadosState.getEmpleados);
      this.turnos$ = this.store.select(TurnoState.getTurnos);
    }

  ngOnInit(): void {
    this.store.dispatch([new GetEmpleado(), new GetTurno(),new GetPermisosRol()]);
    this.filtrarTurnosPorDia();
  }

  filtrarTurnosPorDia() {
    const dia = this.data.day;
    return this.turnos$.subscribe({
      next: (turnos) => {
        this.turnos = turnos.filter((turno) => turno.dia === dia);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  agregarHorario() {
    if(!this.horario.usuariosId || !this.horario.turnoId){
      this.openSnackBar('Debe completar todos los campos', 'Cerrar');
      return;
    }
    this.store.dispatch(new AddHorario(this.horario)).subscribe({
      next: () => {
        console.log('Horario asignado exitosamente');
        this.openSnackBar('Horario asignado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al agregada Horario:', error);
        this.openSnackBar('Horario no se pudo agregar', 'Cerrar');
      }
    });
    this.horario = {
      id: 0,
      diaSemana: new Date(),
      usuariosId: 0,
      turnoId: 0
    };
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}
