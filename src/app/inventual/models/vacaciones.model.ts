export interface VacacionesModel {
  id: any;
  fechaInicio: Date;
  fechaFin: Date;
  aprobacion: boolean;  // Indica si está aprobado o no
  usuariosId: number;   // ID del usuario relacionado
}

export interface VacacionesStringModel {
  id: number;
  fechaInicio: Date;
  fechaFin: Date;
  aprobacion: boolean;  // Indica si está aprobado o no
  usuariosId: number;// Indica si está aprobado o no
  usuariosIdstring: string;    // ID del usuario relacionado
}