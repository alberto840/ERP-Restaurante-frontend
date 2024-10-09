import { Injectable } from '@angular/core';
import { AsistenciaModel } from '../models/asistencia.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private baseUrl = environment.apiUrl+'api/v1/asistencia';

  constructor(private http: HttpClient) {}
  
  // Obtener todas las asistencias
  getAllAsistencias(): Observable<ResponseModel<AsistenciaModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<ResponseModel<AsistenciaModel[]>>(`${this.baseUrl}`, { headers });
  }
  
  // Agregar una nueva asistencia
  addAsistencia(asistencia: any): Observable<ResponseModel<AsistenciaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<ResponseModel<AsistenciaModel>>(`${this.baseUrl}/crear`, asistencia, { headers });
  }
  
  // Actualizar una asistencia
  updateAsistencia(asistencia: any): Observable<ResponseModel<AsistenciaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.put<ResponseModel<AsistenciaModel>>(`${this.baseUrl}/actualizar/${asistencia.id}`, asistencia, { headers });
  }
  
  // Eliminar una asistencia
  deleteAsistencia(asistenciaId: number): Observable<ResponseModel<AsistenciaModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.delete<ResponseModel<AsistenciaModel>>(`${this.baseUrl}/eliminar/${asistenciaId}`, { headers });
  }
  
}
