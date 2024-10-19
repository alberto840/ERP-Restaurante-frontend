export class GetHorario {
    static readonly type = '[Horario] Get Horario';
}

export class AddHorario {
    static readonly type = '[Horario] Add Horario';
    constructor(public payload: any) {}
}

export class UpdateHorario {
  static readonly type = '[Horario] Update Horario';
  constructor(public payload: any) {}
}

export class DeleteHorario {
  static readonly type = '[Horario] Delete Horario';
  constructor(public id: number) {}
}