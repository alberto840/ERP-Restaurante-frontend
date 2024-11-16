export interface ActividadesModel {
    id: number;
    tabla: string;
    accion: string;
    fecha: string;
    detalle: string;
    registroId: number;
    usuariosId: number;
}

export interface ActividadesStringModel {
    id: number;
    tabla: string;
    accion: string;
    fecha: string;
    detalle: string;
    registroId: number;
    usuariosId: number;
    registroIdString: string;
    usuariosIdString: string;
}