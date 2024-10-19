import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VacacionesModel } from '../../models/vacaciones.model';
import { Store } from '@ngxs/store';
import { AddVacacion } from '../../state-management/vacacion/vacacion.action';
import { GetEmpleado } from '../../state-management/empleado/empleado.action';
import { UsuarioModel } from '../../models/empleado.model';
import { Observable } from 'rxjs';
import { EmpleadosState } from '../../state-management/empleado/empleado.state';

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

  agregarVacacion() {
    this.store.dispatch(new AddVacacion(this.vacacion));
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
  
    constructor(private store: Store) {
      this.users$ = this.store.select(EmpleadosState.getEmpleados);
    }
  
    ngOnInit(): void {
      this.store.dispatch([new GetEmpleado()]);
    }
  
}
