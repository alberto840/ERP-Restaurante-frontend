import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActividadesModel } from '../models/actividades.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private baseUrl = environment.apiUrl + 'api/auditorias';

  constructor(private http: HttpClient) {}
  
  getAllActividades(): Observable<ResponseModel<ActividadesModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<ActividadesModel[]>>(`${this.baseUrl}/all`, { headers });
  }
  
  addActividad(actividad: ActividadesModel): Observable<ResponseModel<ActividadesModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<ActividadesModel>>(`${this.baseUrl}`, actividad, { headers });
  }
  
  updateActividad(actividad: ActividadesModel): Observable<ResponseModel<ActividadesModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<ActividadesModel>>(`${this.baseUrl}/actualizar/${actividad.id}`, actividad, { headers });
  }
  
  deleteActividad(actividadId: number): Observable<ResponseModel<ActividadesModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<ActividadesModel>>(`${this.baseUrl}/${actividadId}`, { headers });
  }
  
}
