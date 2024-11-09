import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/inventual/models/empleado.model';
import { RolModel } from 'src/app/inventual/models/rol.model';
import { SucursalModel } from 'src/app/inventual/models/sucursal.model';
import { SucursalEditComponent } from '../sucursal-edit/sucursal-edit.component';
import { DialogData } from 'src/app/inventual/services/dialogs/dialogs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesState } from 'src/app/inventual/state-management/rol/rol.state';
import { SucursalState } from 'src/app/inventual/state-management/sucursal/sucursal.state';
import { GetRol } from 'src/app/inventual/state-management/rol/rol.action';
import { GetSucursal } from 'src/app/inventual/state-management/sucursal/sucursal.action';
import { UpdateEmpleado } from 'src/app/inventual/state-management/empleado/empleado.action';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {  
  hide = true;
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

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<SucursalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.user = { ...data.usuario };
      this.roles$ = this.store.select(RolesState.getRoles);
      this.sucursales$ = this.store.select(SucursalState.getSucursales);
    }

  ngOnInit(): void {
    this.store.dispatch([new GetRol(), new GetSucursal()]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarContrato() {
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
    this.store.dispatch(new UpdateEmpleado(this.user)).subscribe({
      next: () => {
        this.openSnackBar('Usuario actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar Usuario:', error);
        this.openSnackBar('No se pudo actualizar Usuario', 'Cerrar');
      }
    });
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}