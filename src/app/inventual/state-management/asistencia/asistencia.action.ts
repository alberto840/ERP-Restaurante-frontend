export class GetAsistencia {
    static readonly type = '[Asistencia] Get Asistencia';
}

export class AddAsistencia {
    static readonly type = '[Asistencia] Add Asistencia';
    constructor(public payload: any) {}
}

export class UpdateAsistencia {
  static readonly type = '[Asistencia] Update Asistencia';
  constructor(public payload: any) {}
}

export class DeleteAsistencia {
  static readonly type = '[Asistencia] Delete Asistencia';
  constructor(public id: number) {}
}