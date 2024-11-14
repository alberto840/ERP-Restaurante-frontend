export interface RolModel {
  id: number;
  nombre: string;
}

export interface PermisoModel {
  permisosRolesId: number;
  rolId: number;
  permisoId: number;
  status: boolean;
}