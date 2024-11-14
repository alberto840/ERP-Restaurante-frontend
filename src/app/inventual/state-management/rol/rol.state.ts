import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { PermisoModel, RolModel } from '../../models/rol.model';
import { RolService } from '../../services/rol.service';
import { AddRol, UpdateRol, DeleteRol, GetRol } from './rol.action';
import { AddPermisosRol } from '../permisos-rol/permisos-rol.action';

export interface RolesStateModel {
  roles: RolModel[];
}

@State<RolesStateModel>({
  name: 'roles',
  defaults: {
    roles: [],
  }
})
@Injectable()
export class RolesState {
  constructor(private rolService: RolService, private store: Store) {}

  @Selector()
  static getRoles(state: RolesStateModel) {
    return state.roles;
  }

  @Action(GetRol)
  getRoles({ patchState }: StateContext<RolesStateModel>) {
    return this.rolService.getAllRoles().pipe(
      tap((response) => {
        patchState({ roles: response });
      })
    );
  }

  @Action(AddRol)
  addRol({ getState, patchState }: StateContext<RolesStateModel>, { payload }: AddRol) {
    return this.rolService.addRol(payload).pipe(
      tap((response) => {
        this.crearPermisoinicial(response.id);
        const state = getState();
        patchState({
          roles: [...state.roles, response],
        });
      })
    );
  }

  crearPermisoinicial(rolid: number) {
    let permiso: PermisoModel = {
      permisosRolesId: 0,
      rolId: rolid,
      permisoId: 0,
      status: false
    }    
    for(let i = 0; i < 34; i++) {
      permiso.permisoId = i+1;
      this.store.dispatch(new AddPermisosRol(permiso)).subscribe({
        next: (response) => {
          console.log('Permiso agregar exitosamente'+i+"permisoId: "+permiso.rolId);
        },
        error: (error) => {
          console.error('Error al agregar contrato:', error+"permisoIdxd: "+permiso.rolId);
        }
      });
    }
  }

  @Action(UpdateRol)
  updateRol({ getState, setState }: StateContext<RolesStateModel>, { payload }: UpdateRol) {
    return this.rolService.updateRol(payload).pipe(
      tap((response) => {
        const state = getState();
        const roles = [...state.roles];
        const index = roles.findIndex((rol) => rol.id === payload.id);
        roles[index] = response.data;
        setState({
          ...state,
          roles,
        });
      })
    );
  }

  @Action(DeleteRol)
  deleteRol({ getState, setState }: StateContext<RolesStateModel>, { id }: DeleteRol) {
    return this.rolService.deleteRol(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.roles.filter((rol) => rol.id !== id);
        setState({
          ...state,
          roles: filteredArray,
        });
      })
    );
  }
}
