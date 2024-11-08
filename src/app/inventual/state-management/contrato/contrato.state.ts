import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AddContrato, DeleteContrato, GetContrato, UpdateContrato } from './contrato.action';
import { ContratoModel } from '../../models/contrato.model';
import { ContratoService } from '../../services/contrato.service';

export interface ContratoStateModel {
  contratos: ContratoModel[];
}

@State<ContratoStateModel>({
  name: 'contratos',
  defaults: {
    contratos: [],
  }
})
@Injectable()
export class ContratoState {
  constructor(private contratoService: ContratoService) {}

  @Selector()
  static getContratos(state: ContratoStateModel) {
    return state.contratos;
  }

  @Action(GetContrato)
  getContratos({ patchState }: StateContext<ContratoStateModel>) {
    return this.contratoService.getAllContratos().pipe(
      tap((response) => {
        patchState({ contratos: response });
      })
    );
  }

  @Action(AddContrato)
  addContrato({ getState, patchState }: StateContext<ContratoStateModel>, { payload }: AddContrato) {
    return this.contratoService.addContrato(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          contratos: [...state.contratos, response],
        });
      })
    );
  }

  @Action(UpdateContrato)
  updateContrato({ getState, setState }: StateContext<ContratoStateModel>, { payload }: UpdateContrato) {
    return this.contratoService.updateContrato(payload).pipe(
      tap((response) => {
        const state = getState();
        const contratos = [...state.contratos];
        const index = contratos.findIndex((contrato) => contrato.id === payload.id);
        contratos[index] = response;
        setState({
          ...state,
          contratos,
        });
      })
    );
  }

  @Action(DeleteContrato)
  deleteContrato({ getState, setState }: StateContext<ContratoStateModel>, { id }: DeleteContrato) {
    return this.contratoService.deleteContrato(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.contratos.filter((contrato) => contrato.id !== id);
        setState({
          ...state,
          contratos: filteredArray,
        });
      })
    );
  }
}
