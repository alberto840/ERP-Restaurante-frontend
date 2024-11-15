import { Injectable } from '@angular/core';
import { GetPermisosRol } from '../state-management/permisos-rol/permisos-rol.action';
import { Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';
import { PermisoModel } from '../models/rol.model';
import { PermisoRolState } from '../state-management/permisos-rol/permisos-rol.state';

@Injectable({
  providedIn: 'root'
})
export class PermisosAppService {
  permisosRoles$: Observable<PermisoModel[]>;
  idRolUserActual: number = localStorage.getItem('rol') ? parseInt(localStorage.getItem('rol') || '0') : 0;

  constructor(private store: Store) { 
    this.permisosRoles$ = this.store.select(PermisoRolState.getPermisosRol);
  }
  
filtrarPermisosPorRolId(): PermisoModel[] {
  const rolIdUser = this.idRolUserActual;
  let filteredPermisos: PermisoModel[] = [];
  this.permisosRoles$.subscribe((permisos) => {
    filteredPermisos = permisos.filter((permiso) => permiso.rolId === rolIdUser);
  }).unsubscribe();
  return filteredPermisos;
}

findAccess(idPermiso: number): boolean {
  this.store.dispatch([new GetPermisosRol()]);
  const permisoEncontrado = this.filtrarPermisosPorRolId().find(item => item.permisoId === idPermiso);
  return permisoEncontrado ? permisoEncontrado.status : false;
}

}
