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
  private baseUrl = environment.apiUrl+'api/registros';

  constructor(private http: HttpClient) {}
  
  // Obtener todas las asistencias
  getAllAsistencias(): Observable<AsistenciaModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<AsistenciaModel[]>(`${this.baseUrl}/all`, { headers });
  }
  
  // Obtener todas las asistencias
  getAllAsistenciasUsuario(usuarioId: number): Observable<AsistenciaModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<AsistenciaModel[]>(`${this.baseUrl}/usuario/${usuarioId}`, { headers });
  }
  
  // Obtener todas las asistencias
  getAllAsistenciasFecha(fecha: Date): Observable<AsistenciaModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<AsistenciaModel[]>(`${this.baseUrl}/fecha/${fecha}`, { headers });
  }
}
