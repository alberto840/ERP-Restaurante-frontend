export interface RolModel {
  id: number;
  nombre: string;
}

export interface PermisoModel {
  id: number;
  rolId: number;
  permisoId: number;
}