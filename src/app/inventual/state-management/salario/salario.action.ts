export class GetSalario {
    static readonly type = '[Salario] Get Salario';
}

export class AddSalario {
    static readonly type = '[Salario] Add Salario';
    constructor(public payload: any) {}
}

export class UpdateSalario {
  static readonly type = '[Salario] Update Salario';
  constructor(public payload: any) {}
}

export class DeleteSalario {
  static readonly type = '[Salario] Delete Salario';
  constructor(public id: number) {}
}