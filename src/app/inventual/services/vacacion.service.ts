import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { VacacionesModel } from '../models/vacaciones.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacacionService {
  private baseUrl = environment.apiUrl+'api/v1/vacacion';

  constructor(private http: HttpClient) {}

  getAllVacaciones(): Observable<ResponseModel<VacacionesModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<VacacionesModel[]>>(`${this.baseUrl}`, { headers });
  }

  addVacacion(vacacion: VacacionesModel): Observable<ResponseModel<VacacionesModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<VacacionesModel>>(`${this.baseUrl}/crear`, vacacion, { headers });
  }

  updateVacacion(vacacion: VacacionesModel): Observable<ResponseModel<VacacionesModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<VacacionesModel>>(`${this.baseUrl}/actualizar/${vacacion.id}`, vacacion, { headers });
  }

  deleteVacacion(vacacionId: number): Observable<ResponseModel<VacacionesModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<VacacionesModel>>(`${this.baseUrl}/eliminar/${vacacionId}`, { headers });
  }
}
