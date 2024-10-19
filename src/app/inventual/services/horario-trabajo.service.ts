import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HorarioModel } from '../models/horarios.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioTrabajoService {
  private baseUrl = environment.apiUrl + 'api/horariostrabajo';

  constructor(private http: HttpClient) {}
  
  getAllHorarios(): Observable<HorarioModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<HorarioModel[]>(`${this.baseUrl}/all`, { headers });
  }
  
  addHorario(horario: HorarioModel): Observable<HorarioModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<HorarioModel>(`${this.baseUrl}/create`, horario, { headers });
  }
  
  updateHorario(horario: HorarioModel): Observable<ResponseModel<HorarioModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<HorarioModel>>(`${this.baseUrl}/actualizar/${horario.id}`, horario, { headers });
  }
  
  deleteHorario(horarioId: number): Observable<ResponseModel<HorarioModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<HorarioModel>>(`${this.baseUrl}/eliminar/${horarioId}`, { headers });
  }
  
}
