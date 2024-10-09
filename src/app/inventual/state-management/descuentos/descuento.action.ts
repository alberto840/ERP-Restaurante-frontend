export class GetDescuento {
    static readonly type = '[Descuento] Get Descuento';
}

export class AddDescuento {
    static readonly type = '[Descuento] Add Descuento';
    constructor(public payload: any) {}
}

export class UpdateDescuento {
  static readonly type = '[Descuento] Update Descuento';
  constructor(public payload: any) {}
}

export class DeleteDescuento {
  static readonly type = '[Descuento] Delete Descuento';
  constructor(public id: number) {}
}