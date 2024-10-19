import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddTurno, DeleteTurno, GetTurno, UpdateTurno } from './turno.action';
import { TurnoService } from '../../services/turno.service';
import { TurnoModel } from '../../models/horarios.model';

export interface TurnoStateModel {
  turnos: TurnoModel[];
}

@State<TurnoStateModel>({
  name: 'turnos',
  defaults: {
    turnos: [],
  }
})
@Injectable()
export class TurnoState {
  constructor(private turnoService: TurnoService) {}

  @Selector()
  static getTurnos(state: TurnoStateModel) {
    return state.turnos;
  }

  @Action(GetTurno)
  getTurnos({ patchState }: StateContext<TurnoStateModel>) {
    return this.turnoService.getAllTurnos().pipe(
      tap((response) => {
        patchState({ turnos: response });
      })
    );
  }

  @Action(AddTurno)
  addTurno({ getState, patchState }: StateContext<TurnoStateModel>, { payload }: AddTurno) {
    return this.turnoService.addTurno(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          turnos: [...state.turnos, response],
        });
      })
    );
  }

  @Action(UpdateTurno)
  updateTurno({ getState, setState }: StateContext<TurnoStateModel>, { payload }: UpdateTurno) {
    return this.turnoService.updateTurno(payload).pipe(
      tap((response) => {
        const state = getState();
        const turnos = [...state.turnos];
        const index = turnos.findIndex((turno) => turno.id === payload.id);
        turnos[index] = response.data;
        setState({
          ...state,
          turnos,
        });
      })
    );
  }

  @Action(DeleteTurno)
  deleteTurno({ getState, setState }: StateContext<TurnoStateModel>, { id }: DeleteTurno) {
    return this.turnoService.deleteTurno(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.turnos.filter((turno) => turno.id !== id);
        setState({
          ...state,
          turnos: filteredArray,
        });
      })
    );
  }
}
