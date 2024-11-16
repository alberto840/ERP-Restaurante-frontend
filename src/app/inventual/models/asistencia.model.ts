export interface AsistenciaModel {
    id: number;
    fecha: Date;
    horaMarcada: Date;
    tipoMarcado: number;
    retraso: boolean;
    usuarioId: number;
}

export interface AsistenciaStringModel {
    id: number;
    fecha: Date;
    horaMarcada: Date;
    tipoMarcado: number;
    tipoMarcadostring: string;
    retraso: boolean;
    usuarioId: number;
    usuarioIdstring: string;
}