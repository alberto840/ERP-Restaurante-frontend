import { Component, OnInit } from '@angular/core';
import { HorarioModel, TurnoModel } from '../../models/horarios.model';
import { UsuarioModel } from '../../models/empleado.model';
import { Observable } from 'rxjs';
import { AddHorario } from '../../state-management/horario/horario.action';
import { Store } from '@ngxs/store';
import { EmpleadosState } from '../../state-management/empleado/empleado.state';
import { GetEmpleado } from '../../state-management/empleado/empleado.action';
import { TurnoState } from '../../state-management/turno/turno.state';
import { GetTurno } from '../../state-management/turno/turno.action';
import { PermisosAppService } from '../../services/permisos-app.service';

@Component({
  selector: 'app-registro-horario',
  templateUrl: './registro-horario.component.html',
  styleUrls: ['./registro-horario.component.scss']
})
export class RegistroHorarioComponent implements OnInit {
  checked = false;
  disabled = false;
  
  users$: Observable<UsuarioModel[]>; // Observable que contiene los users
  turnos$: Observable<TurnoModel[]>; // Observable que contiene los users
  horario: HorarioModel = {
    id: 0,
    diaSemana: new Date(),
    usuariosId: 0,
    turnoId: 0
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

  agregarHorario() {
    this.store.dispatch(new AddHorario(this.horario));
    this.horario = {
      id: 0,
      diaSemana: new Date(),
      usuariosId: 0,
      turnoId: 0
    };
  }

  //sidebar menu activation end
  
  hide = true;
  
    constructor(private store: Store, public permisosAppService: PermisosAppService) {
      this.users$ = this.store.select(EmpleadosState.getEmpleados);
      this.turnos$ = this.store.select(TurnoState.getTurnos);
    }
  
    ngOnInit(): void {
      this.store.dispatch([new GetEmpleado(), new GetTurno()]);
    }
  
}
