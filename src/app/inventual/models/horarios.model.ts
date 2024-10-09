export interface TurnoModel {
    nombre: string;
    descripcion: string;
    horaInicio: string; // También podría ser de tipo Date si prefieres manejar fechas.
    horaFin: string;    // Igual que horaInicio, podría ser Date si es necesario.
    dia: string;
  }
  
  export interface HorarioModel {
    diaSemana: string;
    usuariosId: number;
    turnoId: number;
  }