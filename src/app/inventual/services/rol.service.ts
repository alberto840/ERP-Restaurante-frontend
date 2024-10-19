import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { RolModel } from '../models/rol.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private baseUrl = environment.apiUrl+'api/roles';

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<RolModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<RolModel[]>(`${this.baseUrl}/all`, { headers });
  }

  addRol(rol: RolModel): Observable<RolModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<RolModel>(`${this.baseUrl}/create`, rol, { headers });
  }

  updateRol(rol: RolModel): Observable<ResponseModel<RolModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<RolModel>>(`${this.baseUrl}/actualizar/${rol.id}`, rol, { headers });
  }

  deleteRol(rolId: number): Observable<ResponseModel<RolModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<RolModel>>(`${this.baseUrl}/delete/${rolId}`, { headers });
  }
}
