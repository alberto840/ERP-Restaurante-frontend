export interface SalariosModel {
  id: any;
  salario: number;
  fechapago: Date;
  descuentoId: number;
  usuariosId: number;
}

export interface SalariosStringModel {
  id: number;
  salario: number;
  fechapago: Date;
  descuentoId: number;
  usuariosId: number;
  descuentoIdstring: string;
  usuariosIdstring: string;
}