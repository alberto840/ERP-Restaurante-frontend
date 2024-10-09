export interface ContratoModel {
    fechaInicio: Date;      // Representa la fecha de inicio del contrato
    fechaConclusion: Date;  // Representa la fecha de conclusión del contrato
    fechaContrato: Date;    // Representa la fecha de firma o establecimiento del contrato
    identificador: number;    // Un identificador único para el contrato
    usuariosId: number;  
}