export interface TurnoModel {
    id: number;
    nombre: string;
    descripcion: string;
    horaInicio: Date; // También podría ser de tipo Date si prefieres manejar fechas.
    horaFin: Date;    // Igual que horaInicio, podría ser Date si es necesario.
    dia: string;
  }
  
  export interface HorarioModel {
    id: number;
    diaSemana: Date;
    usuariosId: number;
    turnoId: number;
  }