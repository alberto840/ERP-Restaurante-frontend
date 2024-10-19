export class GetContrato {
    static readonly type = '[Contrato] Get Contrato';
}

export class AddContrato {
    static readonly type = '[Contrato] Add Contrato';
    constructor(public payload: any) {}
}

export class UpdateContrato {
  static readonly type = '[Contrato] Update Contrato';
  constructor(public payload: any) {}
}

export class DeleteContrato {
  static readonly type = '[Contrato] Delete Contrato';
  constructor(public id: number) {}
}