import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoModel } from '../models/empleado.model';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private baseUrl = environment.apiUrl+'api/v1/usuarios';

  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post<ResponseModel<any>>(`${this.baseUrl}/login`, user);
  }

  getAllEmpleados(): Observable<ResponseModel<EmpleadoModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<EmpleadoModel[]>>(`${this.baseUrl}`, { headers });
  }

  addEmpleado(empleado: EmpleadoModel): Observable<ResponseModel<EmpleadoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<EmpleadoModel>>(`${this.baseUrl}/crear`, empleado, { headers });
  }

  updateEmpleado(empleado: EmpleadoModel): Observable<ResponseModel<EmpleadoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<EmpleadoModel>>(`${this.baseUrl}/actualizar/${empleado.id}`, empleado, { headers });
  }

  deleteEmpleado(empleadoId: number): Observable<ResponseModel<EmpleadoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<EmpleadoModel>>(`${this.baseUrl}/eliminar/${empleadoId}`, { headers });
  }
}
