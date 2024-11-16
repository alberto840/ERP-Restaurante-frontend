import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RolModel } from '../../models/rol.model';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../../models/empleado.model';
import { AddEmpleado, DeleteEmpleado } from '../../state-management/empleado/empleado.action';
import { Store } from '@ngxs/store';
import { RolesState } from '../../state-management/rol/rol.state';
import { GetRol } from '../../state-management/rol/rol.action';
import { SucursalModel } from '../../models/sucursal.model';
import { SucursalState } from '../../state-management/sucursal/sucursal.state';
import { GetSucursal } from '../../state-management/sucursal/sucursal.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { CsvreportService } from '../../services/reportes/csvreport.service';
import { PdfreportService } from '../../services/reportes/pdfreport.service';
import { PermisosAppService } from '../../services/permisos-app.service';
import { GetPermisosRol } from '../../state-management/permisos-rol/permisos-rol.action';

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
    rolesId: 0,
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
    if (!this.user.nombre || !this.user.primerApellido || !this.user.segundoApellido || !this.user.correo || !this.user.password || !this.user.fechaIngreso || !this.user.estado || !this.user.direccion || !this.user.edad || !this.user.telefono || !this.user.rolesId || !this.user.sucursalId) {
      this.openSnackBar('Por favor complete todos los campos', 'Cerrar');
      return;
    }
    if (this.user.nombre.length < 3 || this.user.nombre.length > 50) {
      this.openSnackBar('El nombre tiene que estar entre 3 y 50 caracteres', 'Cerrar');
      return;
    }
    if (this.user.primerApellido.length < 3 || this.user.primerApellido.length > 50) {
      this.openSnackBar('El Primer Apellido tiene que estar entre 3 y 150 caracteres', 'Cerrar');
      return;
    }
    if (this.user.segundoApellido.length < 3 || this.user.segundoApellido.length > 50) {
      this.openSnackBar('El Segundo Apellido tiene que estar entre 3 y 150 caracteres', 'Cerrar');
      return;
    }
    if (this.user.correo.length < 3 || this.user.correo.length > 50) {
      this.openSnackBar('El correo tiene que estar entre 3 y 150 caracteres', 'Cerrar');
      return;
    }
    if (this.user.password.length < 3 || this.user.password.length > 50) {
      this.openSnackBar('El Password tiene que estar entre 3 y 150 caracteres', 'Cerrar');
      return;
    }
    if (this.user.direccion.length < 3 || this.user.direccion.length > 50) {
      this.openSnackBar('La dirección tiene que estar entre 3 y 150 caracteres', 'Cerrar');
      return;
    }
    if (this.user.telefono.length < 3 || this.user.telefono.length > 50) {
      this.openSnackBar('El telefono tiene que estar entre 3 y 150 caracteres', 'Cerrar');
      return;
    }
    this.store.dispatch(new AddEmpleado(this.user)).subscribe({
      next: () => {
        console.log('Empleado agregada exitosamente');
        this.openSnackBar('Empleado agregado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al agregada Empleado:', error);
        this.openSnackBar('Empleado no se pudo agregar', 'Cerrar');
      }
    });
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
      rolesId: 0,
      sucursalId: 0,
      id: 0
    };
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  eliminarEmpleado(id: number) {
    this.store.dispatch(new DeleteEmpleado(id)).subscribe({
      next: () => {
        console.log('Empleado eliminada exitosamente');
        this.openSnackBar('Empleado eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminada Empleado:', error);
        this.openSnackBar('Empleado no se pudo eliminar', 'Cerrar');
      }
    });
  }

  //sidebar menu activation end
  
  hide = true;
  
  constructor(private store: Store, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService, public permisosAppService: PermisosAppService) {
      this.roles$ = this.store.select(RolesState.getRoles);
      this.sucursales$ = this.store.select(SucursalState.getSucursales);
    }
  
    ngOnInit(): void {
      this.store.dispatch([new GetRol(), new GetSucursal(),new GetPermisosRol()]);
    }
  
}
