export class GetTurno {
    static readonly type = '[Turno] Get Turno';
}

export class AddTurno {
    static readonly type = '[Turno] Add Turno';
    constructor(public payload: any) {}
}

export class UpdateTurno {
  static readonly type = '[Turno] Update Turno';
  constructor(public payload: any) {}
}

export class DeleteTurno {
  static readonly type = '[Turno] Delete Turno';
  constructor(public id: number) {}
}