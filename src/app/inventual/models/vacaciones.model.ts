export interface VacacionesModel {
  id: any;
  fechaInicio: Date;
  fechaFin: Date;
  aprobacion: boolean;  // Indica si está aprobado o no
  usuariosId: number;   // ID del usuario relacionado
}