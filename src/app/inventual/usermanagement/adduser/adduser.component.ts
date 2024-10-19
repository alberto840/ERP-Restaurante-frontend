import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RolModel } from '../../models/rol.model';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../../models/empleado.model';
import { AddEmpleado } from '../../state-management/empleado/empleado.action';
import { Store } from '@ngxs/store';
import { RolesState } from '../../state-management/rol/rol.state';
import { GetRol } from '../../state-management/rol/rol.action';
import { SucursalModel } from '../../models/sucursal.model';
import { SucursalState } from '../../state-management/sucursal/sucursal.state';
import { GetSucursal } from '../../state-management/sucursal/sucursal.action';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdduserComponent implements OnInit {
  checked = false;
  disabled = false;
  
  roles$: Observable<RolModel[]>; // Observable que contiene los roles
  sucursales$: Observable<SucursalModel[]>; // Observable que contiene los roles
  user: UsuarioModel = {
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    correo: '',
    password: '',
    fechaIngreso: new Date(),
    estado: true,
    direccion: '',
    edad: new Date(),
    telefono: '',
    //hasta tener el endpoint de roles
    rolesId: 1,
    sucursalId: 0,
    id: 0
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

  agregarUsuario() {
    this.store.dispatch(new AddEmpleado(this.user));
    this.user = {
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      correo: '',
      password: '',
      fechaIngreso: new Date(),
      estado: true,
      direccion: '',
      edad: new Date(),
      telefono: '',
      //hasta tener el endpoint de roles
      rolesId: 1,
      sucursalId: 0,
      id: 0
    };
  }

  //sidebar menu activation end
  
  hide = true;
  
    constructor(private store: Store) {
      this.roles$ = this.store.select(RolesState.getRoles);
      this.sucursales$ = this.store.select(SucursalState.getSucursales);
    }
  
    ngOnInit(): void {
      this.store.dispatch([new GetRol(), new GetSucursal()]);
    }
  
}
