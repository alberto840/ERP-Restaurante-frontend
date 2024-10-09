export interface ResponseModel<T> {
    success: boolean;
    message: string;
    data: T;  // Aquí 'T' es el tipo genérico que representará la data
  }
  