import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddHorario, DeleteHorario, GetHorario, UpdateHorario } from './horario.action';
import { HorarioModel } from '../../models/horarios.model';
import { HorarioTrabajoService } from '../../services/horario-trabajo.service';

export interface HorarioStateModel {
  horarios: HorarioModel[];
}

@State<HorarioStateModel>({
  name: 'horarios',
  defaults: {
    horarios: [],
  }
})
@Injectable()
export class HorarioState {
  constructor(private horarioService: HorarioTrabajoService) {}

  @Selector()
  static getHorarios(state: HorarioStateModel) {
    return state.horarios;
  }

  @Action(GetHorario)
  getHorarios({ patchState }: StateContext<HorarioStateModel>) {
    return this.horarioService.getAllHorarios().pipe(
      tap((response) => {
        patchState({ horarios: response });
      })
    );
  }

  @Action(AddHorario)
  addHorario({ getState, patchState }: StateContext<HorarioStateModel>, { payload }: AddHorario) {
    return this.horarioService.addHorario(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          horarios: [...state.horarios, response],
        });
      })
    );
  }

  @Action(UpdateHorario)
  updateHorario({ getState, setState }: StateContext<HorarioStateModel>, { payload }: UpdateHorario) {
    return this.horarioService.updateHorario(payload).pipe(
      tap((response) => {
        const state = getState();
        const horarios = [...state.horarios];
        const index = horarios.findIndex((horario) => horario.id === payload.id);
        horarios[index] = response.data;
        setState({
          ...state,
          horarios,
        });
      })
    );
  }

  @Action(DeleteHorario)
  deleteHorario({ getState, setState }: StateContext<HorarioStateModel>, { id }: DeleteHorario) {
    return this.horarioService.deleteHorario(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.horarios.filter((horario) => horario.id !== id);
        setState({
          ...state,
          horarios: filteredArray,
        });
      })
    );
  }
}
