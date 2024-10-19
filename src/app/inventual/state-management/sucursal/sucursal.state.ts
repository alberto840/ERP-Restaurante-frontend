import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GetSucursal, AddSucursal, UpdateSucursal, DeleteSucursal } from './sucursal.action';
import { SucursalModel } from '../../models/sucursal.model';
import { SucursalService } from '../../services/sucursal.service';

export interface SucursalStateModel {
  sucursales: SucursalModel[];
}

@State<SucursalStateModel>({
  name: 'sucursales',
  defaults: {
    sucursales: [],
  }
})
@Injectable()
export class SucursalState {
  constructor(private sucursalService: SucursalService) {}

  @Selector()
  static getSucursales(state: SucursalStateModel) {
    return state.sucursales;
  }

  @Action(GetSucursal)
  getSucursales({ patchState }: StateContext<SucursalStateModel>) {
    return this.sucursalService.getAllSucursales().pipe(
      tap((response) => {
        patchState({ sucursales: response });
      })
    );
  }

  @Action(AddSucursal)
  addSucursal({ getState, patchState }: StateContext<SucursalStateModel>, { payload }: AddSucursal) {
    return this.sucursalService.addSucursal(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          sucursales: [...state.sucursales, response],
        });
      })
    );
  }

  @Action(UpdateSucursal)
  updateSucursal({ getState, setState }: StateContext<SucursalStateModel>, { payload }: UpdateSucursal) {
    return this.sucursalService.updateSucursal(payload).pipe(
      tap((response) => {
        const state = getState();
        const sucursales = [...state.sucursales];
        const index = sucursales.findIndex((sucursal) => sucursal.id === payload.id);
        sucursales[index] = response.data;
        setState({
          ...state,
          sucursales,
        });
      })
    );
  }

  @Action(DeleteSucursal)
  deleteSucursal({ getState, setState }: StateContext<SucursalStateModel>, { id }: DeleteSucursal) {
    return this.sucursalService.deleteSucursal(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.sucursales.filter((sucursal) => sucursal.id !== id);
        setState({
          ...state,
          sucursales: filteredArray,
        });
      })
    );
  }
}
