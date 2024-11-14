import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AsistenciaModel } from '../../models/asistencia.model';
import { AsistenciaService } from '../../services/asistencia.service';
import { GetAsistencia } from './asistencia.action';

export interface AsistenciaStateModel {
  asistencias: AsistenciaModel[];
}

@State<AsistenciaStateModel>({
  name: 'asistencias',
  defaults: {
    asistencias: [],
  }
})
@Injectable()
export class AsistenciaState {
  constructor(private asistenciaService: AsistenciaService) {}

  // Selector para obtener asistencias del estado
  @Selector()
  static getAsistencias(state: AsistenciaStateModel) {
    return state.asistencias;
  }

  // Acción para obtener los asistencias
  @Action(GetAsistencia)
  getAsistencias({ patchState }: StateContext<AsistenciaStateModel>) {
    return this.asistenciaService.getAllAsistencias().pipe(
      tap((response) => {
        patchState({ asistencias: response });
      })
    );
  }
}
