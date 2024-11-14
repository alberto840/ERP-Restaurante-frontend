export interface UsuarioModel {
  id: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  correo: string;
  password: string;
  fechaIngreso: Date;
  estado: boolean;
  direccion: string;
  edad: Date;
  telefono: string;
  rolesId: number;
  sucursalId: number;
}

export interface LoginModel {    
    correo: string;
    password: string;
}

export interface PasswordModel {    
  passwordAntigua: string;
  passwordNueva: string;
}