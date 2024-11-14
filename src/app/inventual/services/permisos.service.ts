import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response.model';
import { PermisoModel } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {private baseUrl = environment.apiUrl + 'api/permisos-rol';

  constructor(private http: HttpClient) {}
  
  getAllPermisos(): Observable<PermisoModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<PermisoModel[]>(`${this.baseUrl}/all`, { headers });
  }
  
  addPermiso(permiso: PermisoModel): Observable<PermisoModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<PermisoModel>(`${this.baseUrl}`, permiso, { headers });
  }
  
  updatePermiso(permiso: PermisoModel): Observable<PermisoModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<PermisoModel>(`${this.baseUrl}/${permiso.permisosRolesId}`, permiso, { headers });
  }
  
  deletePermiso(permisoId: number): Observable<ResponseModel<PermisoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<PermisoModel>>(`${this.baseUrl}/${permisoId}`, { headers });
  }
  
}
