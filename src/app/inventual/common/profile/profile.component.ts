import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PasswordModel, UsuarioModel } from '../../models/empleado.model';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RolModel } from '../../models/rol.model';
import { SucursalModel } from '../../models/sucursal.model';
import { GetRol } from '../../state-management/rol/rol.action';
import { RolesState } from '../../state-management/rol/rol.state';
import { GetSucursal } from '../../state-management/sucursal/sucursal.action';
import { SucursalState } from '../../state-management/sucursal/sucursal.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateEmpleado } from '../../state-management/empleado/empleado.action';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  roles$: Observable<RolModel[]>; // Observable que contiene los roles
  roles: RolModel[] = [];
  sucursales$: Observable<SucursalModel[]>; // Observable que contiene los roles
  usuario: UsuarioModel = {
    id: Number(localStorage.getItem('userid')),
    nombre: localStorage.getItem('nombre') || '',
    primerApellido: localStorage.getItem('primerApellido') || '',
    segundoApellido: localStorage.getItem('segundoApellido') || '',
    correo: localStorage.getItem('correo') || '',
    password: '',
    fechaIngreso: localStorage.getItem('fechaIngreso') ? new Date(localStorage.getItem('fechaIngreso')!) : new Date(),
    estado: true,
    direccion: localStorage.getItem('direccion') || '',
    edad: localStorage.getItem('edad') ? new Date(localStorage.getItem('edad')!) : new Date(),
    telefono: localStorage.getItem('telefono') || '',
    rolesId: localStorage.getItem('rol') ? Number(localStorage.getItem('rol')) : 0,
    sucursalId: localStorage.getItem('sucursal') ? Number(localStorage.getItem('sucursal')) : 0
  };
  password: PasswordModel = {
    passwordAntigua: '',
    passwordNueva: ''
  }
//sidebar menu activation start
menuSidebarActive:boolean = false;
isProfileEnabled:boolean = false;
myfunction(){
  if(this.menuSidebarActive == false){
    this.menuSidebarActive = true;
  }
  else {
    this.menuSidebarActive = false;
  }
}

actualizarUsuario() {
  if (!this.usuario.nombre || !this.usuario.primerApellido || !this.usuario.segundoApellido || !this.usuario.correo || !this.usuario.fechaIngreso || !this.usuario.estado || !this.usuario.direccion || !this.usuario.edad || !this.usuario.telefono || !this.usuario.rolesId || !this.usuario.sucursalId) {
    this.openSnackBar('Por favor complete todos los campos', 'Cerrar');
    return;
  }
  if (this.usuario.nombre.length < 3 || this.usuario.nombre.length > 50) {
    this.openSnackBar('El nombre tiene que estar entre 3 y 50 caracteres', 'Cerrar');
    return;
  }
  if (this.usuario.primerApellido.length < 3 || this.usuario.primerApellido.length > 50) {
    this.openSnackBar('El Primer Apellido tiene que estar entre 3 y 150 caracteres', 'Cerrar');
    return;
  }
  if (this.usuario.segundoApellido.length < 3 || this.usuario.segundoApellido.length > 50) {
    this.openSnackBar('El Segundo Apellido tiene que estar entre 3 y 150 caracteres', 'Cerrar');
    return;
  }
  if (this.usuario.correo.length < 3 || this.usuario.correo.length > 50) {
    this.openSnackBar('El correo tiene que estar entre 3 y 150 caracteres', 'Cerrar');
    return;
  }
  if (this.usuario.direccion.length < 3 || this.usuario.direccion.length > 50) {
    this.openSnackBar('La dirección tiene que estar entre 3 y 150 caracteres', 'Cerrar');
    return;
  }
  if (this.usuario.telefono.length < 3 || this.usuario.telefono.length > 50) {
    this.openSnackBar('El telefono tiene que estar entre 3 y 150 caracteres', 'Cerrar');
    return;
  }
  this.store.dispatch(new UpdateEmpleado(this.usuario)).subscribe({
    next: () => {
      this.openSnackBar('Usuario actualizado correctamente', 'Cerrar');
      localStorage.setItem('nombre', this.usuario.nombre);
      localStorage.setItem('primerApellido', this.usuario.primerApellido);
      localStorage.setItem('segundoApellido', this.usuario.segundoApellido);
      localStorage.setItem('correo', this.usuario.correo);
      localStorage.setItem('fechaIngreso', this.usuario.fechaIngreso.toString());
      localStorage.setItem('estado', this.usuario.estado.toString());
      localStorage.setItem('direccion', this.usuario.direccion);
      localStorage.setItem('edad', this.usuario.edad.toString());
      localStorage.setItem('telefono', this.usuario.telefono);

    },
    error: (error) => {
      console.error('Error al actualizar Usuario:', error);
      this.openSnackBar('No se pudo actualizar Usuario', 'Cerrar');
    }
  });
}

actualizarPassword() {
  const iduser = Number(localStorage.getItem('userid'));
  this.empleadoService.updatePassword(this.password, iduser).subscribe({
    next: (response) => {
      this.openSnackBar('Password Actualizado.', 'Cerrar');
    },
    error: (error) => {
      console.error('Error Login:', error);
      this.openSnackBar('Hubo un error al hacer actualizar password.', 'Cerrar');
    }
  });
}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, { duration: 2000 });
}

editProfileEnable(){
  if(this.isProfileEnabled == false){
    this.isProfileEnabled = true;
  }
  else {
    this.isProfileEnabled = false;
  }
}

//sidebar menu activation end
hide = true;
constructor(private store: Store, private _snackBar: MatSnackBar, public empleadoService: EmpleadoService) {
  this.roles$ = this.store.select(RolesState.getRoles);
  this.sucursales$ = this.store.select(SucursalState.getSucursales);}
ngOnInit(): void {
  this.store.dispatch([new GetRol(), new GetSucursal()]);
  this.usuario = {
    id: Number(localStorage.getItem('userid')),
    nombre: localStorage.getItem('nombre') || '',
    primerApellido: localStorage.getItem('primerApellido') || '',
    segundoApellido: localStorage.getItem('segundoApellido') || '',
    correo: localStorage.getItem('correo') || '',
    password: '',
    fechaIngreso: localStorage.getItem('fechaIngreso') ? new Date(localStorage.getItem('fechaIngreso')!) : new Date(),
    estado: true,
    direccion: localStorage.getItem('direccion') || '',
    edad: localStorage.getItem('edad') ? new Date(localStorage.getItem('edad')!) : new Date(),
    telefono: localStorage.getItem('telefono') || '',
    rolesId: localStorage.getItem('rol') ? Number(localStorage.getItem('rol')) : 0,
    sucursalId: localStorage.getItem('sucursal') ? Number(localStorage.getItem('sucursal')) : 0
  }

  this.roles$.subscribe((roles) => {
    this.roles = roles;
  });

}

// Función para obtener el nombre del rol por ID
getRolName(id: number): string {
  if (!this.roles.length) {
    return 'Cargando...'; // Si los roles aún no se han cargado
  }
  const rol = this.roles.find((r) => r.id === id);
  return rol ? rol.nombre : 'Sin Rol';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
}


}
