import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UsuarioModel } from '../../models/empleado.model';
import { EmpleadoService } from '../../services/empleado.service';
import { AddEmpleado, DeleteEmpleado, GetEmpleado, UpdateEmpleado } from './empleado.action';

export interface EmpleadosStateModel {
  empleados: UsuarioModel[];
}

@State<EmpleadosStateModel>({
  name: 'empleados',
  defaults: {
    empleados: [],
  }
})
@Injectable()
export class EmpleadosState {
  constructor(private empleadoService: EmpleadoService) {}

  @Selector()
  static getEmpleados(state: EmpleadosStateModel) {
    return state.empleados;
  }

  @Action(GetEmpleado)
  getEmpleados({ patchState }: StateContext<EmpleadosStateModel>) {
    return this.empleadoService.getAllEmpleados().pipe(
      tap((response) => {
        patchState({ empleados: response.data });
      })
    );
  }

  @Action(AddEmpleado)
  addEmpleado({ getState, patchState }: StateContext<EmpleadosStateModel>, { payload }: AddEmpleado) {
    return this.empleadoService.addEmpleado(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          empleados: [...state.empleados, response.data],
        });
      })
    );
  }

  @Action(UpdateEmpleado)
  updateEmpleado({ getState, setState }: StateContext<EmpleadosStateModel>, { payload }: UpdateEmpleado) {
    return this.empleadoService.updateEmpleado(payload).pipe(
      tap((response) => {
        const state = getState();
        const empleados = [...state.empleados];
        const index = empleados.findIndex((empleado) => empleado.id === payload.id);
        empleados[index] = response.data;
        setState({
          ...state,
          empleados,
        });
      })
    );
  }

  @Action(DeleteEmpleado)
  deleteEmpleado({ getState, setState }: StateContext<EmpleadosStateModel>, { id }: DeleteEmpleado) {
    return this.empleadoService.deleteEmpleado(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.empleados.filter((empleado) => empleado.id !== id);
        setState({
          ...state,
          empleados: filteredArray,
        });
      })
    );
  }
}
