import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VacacionesModel } from '../../models/vacaciones.model';
import { Store } from '@ngxs/store';
import { AddVacacion } from '../../state-management/vacacion/vacacion.action';
import { GetEmpleado } from '../../state-management/empleado/empleado.action';
import { UsuarioModel } from '../../models/empleado.model';
import { Observable } from 'rxjs';
import { EmpleadosState } from '../../state-management/empleado/empleado.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { CsvreportService } from '../../services/reportes/csvreport.service';

@Component({
  selector: 'app-addvacation',
  templateUrl: './addvacation.component.html',
  styleUrls: ['./addvacation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddvacationComponent implements OnInit {
  checked = false;
  disabled = false;
  
  users$: Observable<UsuarioModel[]>; // Observable que contiene los users
  vacacion: VacacionesModel = {
    id: undefined,
    fechaInicio: new Date(),
    fechaFin: new Date(),
    aprobacion: false,
    usuariosId: 0
  };

  //sidebar menu activation start
  menuSidebarActive:boolean=false;
  myfunction(){
    if(this.menuSidebarActive==false){
      this.menuSidebarActive=true;
    }
    else {
      this.menuSidebarActive=false;
    }
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  agregarVacacion() {
    if (!this.vacacion.fechaInicio || !this.vacacion.fechaFin || !this.vacacion.usuariosId || !this.vacacion.aprobacion) {
      this.openSnackBar('Por favor, complete los campos', 'Cerrar');
      return;
    }
    if (this.vacacion.fechaInicio > this.vacacion.fechaFin) {
      this.openSnackBar('La Fecha de inicio no puede ser mayor a la fecha de fin', 'Cerrar');
      return;
    }
    this.store.dispatch(new AddVacacion(this.vacacion)).subscribe({
      next: () => {
        this.openSnackBar('Vacacion registrada correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al registrada Vacacion:', error);
        this.openSnackBar('No se pudo registrada Vacacion', 'Cerrar');
      }
    });
    this.vacacion = {
      id: undefined,
      fechaInicio: new Date(),
      fechaFin: new Date(),
      aprobacion: false,
      usuariosId: 0
    };
  }

  //sidebar menu activation end
  
  hide = true;
  
    constructor(private store: Store, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService) {
      this.users$ = this.store.select(EmpleadosState.getEmpleados);
    }
  
    ngOnInit(): void {
      this.store.dispatch([new GetEmpleado()]);
    }
  
}
