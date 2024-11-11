export interface AsistenciaModel {
    id: number;
    fecha: Date;
    horaMarcada: Date;
    tipoMarcado: number;
    retraso: boolean;
    usuarioId: number;
}