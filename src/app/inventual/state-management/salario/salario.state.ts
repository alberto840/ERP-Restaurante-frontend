import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SalarioService } from '../../services/salario.service';
import { GetSalario, AddSalario, UpdateSalario, DeleteSalario } from './salario.action';
import { SalariosModel } from '../../models/salarios.model';

export interface SalariosStateModel {
  salarios: SalariosModel[];
}

@State<SalariosStateModel>({
  name: 'salarios',
  defaults: {
    salarios: [],
  }
})
@Injectable()
export class SalariosState {
  constructor(private salarioService: SalarioService) {}

  @Selector()
  static getSalarios(state: SalariosStateModel) {
    return state.salarios;
  }

  @Action(GetSalario)
  getSalarios({ patchState }: StateContext<SalariosStateModel>) {
    return this.salarioService.getAllSalarios().pipe(
      tap((response) => {
        patchState({ salarios: response.data });
      })
    );
  }

  @Action(AddSalario)
  addSalario({ getState, patchState }: StateContext<SalariosStateModel>, { payload }: AddSalario) {
    return this.salarioService.addSalario(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          salarios: [...state.salarios, response.data],
        });
      })
    );
  }

  @Action(UpdateSalario)
  updateSalario({ getState, setState }: StateContext<SalariosStateModel>, { payload }: UpdateSalario) {
    return this.salarioService.updateSalario(payload).pipe(
      tap((response) => {
        const state = getState();
        const salarios = [...state.salarios];
        const index = salarios.findIndex((salario) => salario.id === payload.id);
        salarios[index] = response.data;
        setState({
          ...state,
          salarios,
        });
      })
    );
  }

  @Action(DeleteSalario)
  deleteSalario({ getState, setState }: StateContext<SalariosStateModel>, { id }: DeleteSalario) {
    return this.salarioService.deleteSalario(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.salarios.filter((salario) => salario.id !== id);
        setState({
          ...state,
          salarios: filteredArray,
        });
      })
    );
  }
}
