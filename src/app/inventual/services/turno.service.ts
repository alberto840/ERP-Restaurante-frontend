import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TurnoModel } from '../models/horarios.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private baseUrl = environment.apiUrl + 'api/turnos';

  constructor(private http: HttpClient) {}
  
  getAllTurnos(): Observable<TurnoModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<TurnoModel[]>(`${this.baseUrl}/all`, { headers });
  }
  
  addTurno(turno: TurnoModel): Observable<TurnoModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<TurnoModel>(`${this.baseUrl}`, turno, { headers });
  }
  
  updateTurno(turno: TurnoModel): Observable<ResponseModel<TurnoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<TurnoModel>>(`${this.baseUrl}/actualizar/${turno.id}`, turno, { headers });
  }
  
  deleteTurno(turnoId: number): Observable<ResponseModel<TurnoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<TurnoModel>>(`${this.baseUrl}/eliminar/${turnoId}`, { headers });
  }
  
}
