import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { VacacionService } from '../../services/vacacion.service';
import { GetVacacion, AddVacacion, UpdateVacacion, DeleteVacacion } from './vacacion.action';
import { VacacionesModel } from '../../models/vacaciones.model';

export interface VacacionesStateModel {
  vacaciones: VacacionesModel[];
}

@State<VacacionesStateModel>({
  name: 'vacaciones',
  defaults: {
    vacaciones: [],
  }
})
@Injectable()
export class VacacionesState {
  constructor(private vacacionService: VacacionService) {}

  @Selector()
  static getVacaciones(state: VacacionesStateModel) {
    return state.vacaciones;
  }

  @Action(GetVacacion)
  getVacaciones({ patchState }: StateContext<VacacionesStateModel>) {
    return this.vacacionService.getAllVacaciones().pipe(
      tap((response) => {
        patchState({ vacaciones: response.data });
      })
    );
  }

  @Action(AddVacacion)
  addVacacion({ getState, patchState }: StateContext<VacacionesStateModel>, { payload }: AddVacacion) {
    return this.vacacionService.addVacacion(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          vacaciones: [...state.vacaciones, response.data],
        });
      })
    );
  }

  @Action(UpdateVacacion)
  updateVacacion({ getState, setState }: StateContext<VacacionesStateModel>, { payload }: UpdateVacacion) {
    return this.vacacionService.updateVacacion(payload).pipe(
      tap((response) => {
        const state = getState();
        const vacaciones = [...state.vacaciones];
        const index = vacaciones.findIndex((vacacion) => vacacion.id === payload.id);
        vacaciones[index] = response.data;
        setState({
          ...state,
          vacaciones,
        });
      })
    );
  }

  @Action(DeleteVacacion)
  deleteVacacion({ getState, setState }: StateContext<VacacionesStateModel>, { id }: DeleteVacacion) {
    return this.vacacionService.deleteVacacion(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.vacaciones.filter((vacacion) => vacacion.id !== id);
        setState({
          ...state,
          vacaciones: filteredArray,
        });
      })
    );
  }
}
