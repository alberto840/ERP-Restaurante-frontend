export class GetPermisosRol {
    static readonly type = '[PermisosRol] Get PermisosRol';
}

export class AddPermisosRol {
    static readonly type = '[PermisosRol] Add PermisosRol';
    constructor(public payload: any) {}
}

export class UpdatePermisosRol {
  static readonly type = '[PermisosRol] Update PermisosRol';
  constructor(public payload: any) {}
}

export class DeletePermisosRol {
  static readonly type = '[PermisosRol] Delete PermisosRol';
  constructor(public id: number) {}
}