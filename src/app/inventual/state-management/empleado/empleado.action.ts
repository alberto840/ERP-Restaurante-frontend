export class GetEmpleado {
    static readonly type = '[Empleado] Get Empleado';
}

export class AddEmpleado {
    static readonly type = '[Empleado] Add Empleado';
    constructor(public payload: any) {}
}

export class UpdateEmpleado {
  static readonly type = '[Empleado] Update Empleado';
  constructor(public payload: any) {}
}

export class DeleteEmpleado {
  static readonly type = '[Empleado] Delete Empleado';
  constructor(public id: number) {}
}