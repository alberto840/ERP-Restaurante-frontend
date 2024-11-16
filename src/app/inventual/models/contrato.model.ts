export interface ContratoModel {
    id: number;             // Un identificador único para el contrato
    fechaInicio: Date;      // Representa la fecha de inicio del contrato
    fechaConclusion: Date;  // Representa la fecha de conclusión del contrato
    fechaContrato: Date;    // Representa la fecha de firma o establecimiento del contrato
    identificador: number;    // Un identificador único para el contrato
    usuariosId: number;  
}

export interface ContratoStringModel {
    id: number;             // Un identificador único para el contrato
    fechaInicio: Date;      // Representa la fecha de inicio del contrato
    fechaConclusion: Date;  // Representa la fecha de conclusión del contrato
    fechaContrato: Date;    // Representa la fecha de firma o establecimiento del contrato
    identificador: number;    // Un identificador único para el contrato
    usuariosId: number;     // Un identificador único para el contrato
    usuariosIdstring: string; 
}