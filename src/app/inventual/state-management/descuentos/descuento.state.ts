import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DescuentosModel } from '../../models/descuentos.model';
import { DescuentosService } from '../../services/descuentos.service';
import { AddDescuento, DeleteDescuento, GetDescuento, UpdateDescuento } from './descuento.action';

export interface DiscountsStateModel {
  discounts: DescuentosModel[];
}

@State<DiscountsStateModel>({
  name: 'discounts',
  defaults: {
    discounts: [],
  }
})
@Injectable()
export class DiscountsState {
  constructor(private discountService: DescuentosService) {}

  // Selector para obtener los descuentos del estado
  @Selector()
  static getDiscounts(state: DiscountsStateModel) {
    return state.discounts;
  }

  // Acción para obtener los descuentos
  @Action(GetDescuento)
  getDiscounts({ patchState }: StateContext<DiscountsStateModel>) {
    return this.discountService.getAllDescuentos().pipe(
      tap((response) => {
        patchState({ discounts: response });
      })
    );
  }

  // Acción para agregar un descuento
  @Action(AddDescuento)
  addDiscount({ getState, patchState }: StateContext<DiscountsStateModel>, { payload }: AddDescuento) {
    return this.discountService.addDescuento(payload).pipe(
      tap((response) => {
        const state = getState();
        patchState({
          discounts: [...state.discounts, response.data],
        });
      })
    );
  }

  // Acción para actualizar un descuento
  @Action(UpdateDescuento)
  updateDiscount({ getState, setState }: StateContext<DiscountsStateModel>, { payload }: UpdateDescuento) {
    return this.discountService.updateDescuento(payload).pipe(
      tap((response) => {
        const state = getState();
        const discounts = [...state.discounts];
        const index = discounts.findIndex((discount) => discount.id === payload.id);
        discounts[index] = response.data;
        setState({
          ...state,
          discounts,
        });
      })
    );
  }

  // Acción para eliminar un descuento
  @Action(DeleteDescuento)
  deleteDiscount({ getState, setState }: StateContext<DiscountsStateModel>, { id }: DeleteDescuento) {
    return this.discountService.deleteDescuento(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.discounts.filter((discount) => discount.id !== id);
        setState({
          ...state,
          discounts: filteredArray,
        });
      })
    );
  }
}
