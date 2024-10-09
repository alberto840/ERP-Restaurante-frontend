export class GetSucursal {
    static readonly type = '[Sucursal] Get Sucursal';
}

export class AddSucursal {
    static readonly type = '[Sucursal] Add Sucursal';
    constructor(public payload: any) {}
}

export class UpdateSucursal {
  static readonly type = '[Sucursal] Update Sucursal';
  constructor(public payload: any) {}
}

export class DeleteSucursal {
  static readonly type = '[Sucursal] Delete Sucursal';
  constructor(public id: number) {}
}