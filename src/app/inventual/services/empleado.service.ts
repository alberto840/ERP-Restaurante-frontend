import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private baseUrl = environment.apiUrl+'api/usuarios';

  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post<ResponseModel<any>>(`${this.baseUrl}/login`, user);
  }

  getAllEmpleados(): Observable<ResponseModel<UsuarioModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<UsuarioModel[]>>(`${this.baseUrl}`, { headers });
  }

  addEmpleado(empleado: UsuarioModel): Observable<ResponseModel<UsuarioModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<UsuarioModel>>(`${this.baseUrl}`, empleado, { headers });
  }

  updateEmpleado(empleado: UsuarioModel): Observable<ResponseModel<UsuarioModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<UsuarioModel>>(`${this.baseUrl}/actualizar/${empleado.id}`, empleado, { headers });
  }

  deleteEmpleado(empleadoId: number): Observable<ResponseModel<UsuarioModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<UsuarioModel>>(`${this.baseUrl}/eliminar/${empleadoId}`, { headers });
  }
}
