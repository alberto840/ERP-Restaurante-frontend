export interface EmpleadoModel {
  id: any;
}

export interface UsuarioModel {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  correo: string;
  password: string;
  fechaIngreso: Date;
  estado: boolean;
  direccion: string;
  edad: string; // Puedes cambiarlo a Date si prefieres trabajar con objetos Date
  telefono: string;
  rolesId: number;
  sucursalId: number;
}

export interface LoginModel {    
    correo: string;
    password: string;
}