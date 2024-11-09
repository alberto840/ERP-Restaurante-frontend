import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddBono, DeleteBono, GetBono, UpdateBono } from './bono.action';
import { BonosModel } from '../../models/bonos.model';
import { BonosService } from '../../services/bonos.service';

export interface BonosStateModel {
  bonos: BonosModel[];
}

@State<BonosStateModel>({
  name: 'bonos',
  defaults: {
    bonos: [],
  }
})
@Injectable()
export class BonosState {
  constructor(private bonoService: BonosService) {}

  @Selector()
  static getBonos(state: BonosStateModel) {
    return state.bonos;
  }

  @Action(GetBono)
  getBonos({ patchState }: StateContext<BonosStateModel>) {
    return this.bonoService.getAllBonos().pipe(
      tap((response) => {
        patchState({ bonos: response });
      })
    );
  }

  @Action(AddBono)
  addBono({ getState, patchState }: StateContext<BonosStateModel>, { payload }: AddBono) {
    return this.bonoService.addBono(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          bonos: [...state.bonos, response],
        });
      })
    );
  }

  @Action(UpdateBono)
  updateBono({ getState, setState }: StateContext<BonosStateModel>, { payload }: UpdateBono) {
    return this.bonoService.updateBono(payload).pipe(
      tap((response) => {
        const state = getState();
        const bonos = [...state.bonos];
        const index = bonos.findIndex((bono) => bono.id === payload.id);
        bonos[index] = response;
        setState({
          ...state,
          bonos,
        });
      })
    );
  }

  @Action(DeleteBono)
  deleteBono({ getState, setState }: StateContext<BonosStateModel>, { id }: DeleteBono) {
    return this.bonoService.deleteBono(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.bonos.filter((bono) => bono.id !== id);
        setState({
          ...state,
          bonos: filteredArray,
        });
      })
    );
  }
}
