export class GetVacacion {
    static readonly type = '[Vacacion] Get Vacacion';
}

export class AddVacacion {
    static readonly type = '[Vacacion] Add Vacacion';
    constructor(public payload: any) {}
}

export class UpdateVacacion {
  static readonly type = '[Vacacion] Update Vacacion';
  constructor(public payload: any) {}
}

export class DeleteVacacion {
  static readonly type = '[Vacacion] Delete Vacacion';
  constructor(public id: number) {}
}