export class GetBono {
    static readonly type = '[Bono] Get Bono';
}

export class AddBono {
    static readonly type = '[Bono] Add Bono';
    constructor(public payload: any) {}
}

export class UpdateBono {
  static readonly type = '[Bono] Update Bono';
  constructor(public payload: any) {}
}

export class DeleteBono {
  static readonly type = '[Bono] Delete Bono';
  constructor(public id: number) {}
}