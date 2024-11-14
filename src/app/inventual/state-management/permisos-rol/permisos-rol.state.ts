import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { PermisoModel } from '../../models/rol.model';
import { PermisosService } from '../../services/permisos.service';
import { AddPermisosRol, DeletePermisosRol, GetPermisosRol, UpdatePermisosRol } from './permisos-rol.action';

export interface PermisoRolStateModel {
  permisosRol: PermisoModel[];
}

@State<PermisoRolStateModel>({
  name: 'permisosRol',
  defaults: {
    permisosRol: [],
  }
})
@Injectable()
export class PermisoRolState {
  constructor(private permisoRolService: PermisosService) {}

  @Selector()
  static getPermisosRol(state: PermisoRolStateModel) {
    return state.permisosRol;
  }

  @Action(GetPermisosRol)
  getPermisosRol({ patchState }: StateContext<PermisoRolStateModel>) {
    return this.permisoRolService.getAllPermisos().pipe(
      tap((response) => {
        patchState({ permisosRol: response });
      })
    );
  }

  @Action(AddPermisosRol)
  addPermisoRol({ getState, patchState }: StateContext<PermisoRolStateModel>, { payload }: AddPermisosRol) {
    return this.permisoRolService.addPermiso(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          permisosRol: [...state.permisosRol, response],
        });
      })
    );
  }

  @Action(UpdatePermisosRol)
  updatePermisoRol({ getState, setState }: StateContext<PermisoRolStateModel>, { payload }: UpdatePermisosRol) {
    return this.permisoRolService.updatePermiso(payload).pipe(
      tap((response) => {
        const state = getState();
        const permisosRol = [...state.permisosRol];
        const index = permisosRol.findIndex((permisoRol) => permisoRol.permisosRolesId === payload.permisosRolesId);
        permisosRol[index] = response;
        setState({
          ...state,
          permisosRol,
        });
      })
    );
  }

  @Action(DeletePermisosRol)
  deletePermisoRol({ getState, setState }: StateContext<PermisoRolStateModel>, { id }: DeletePermisosRol) {
    return this.permisoRolService.deletePermiso(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.permisosRol.filter((permisoRol) => permisoRol.permisosRolesId !== id);
        setState({
          ...state,
          permisosRol: filteredArray,
        });
      })
    );
  }
}
