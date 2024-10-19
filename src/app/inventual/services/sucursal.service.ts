import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response.model';
import { SucursalModel } from '../models/sucursal.model';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private baseUrl = environment.apiUrl + 'api/sucursales';

  constructor(private http: HttpClient) {}
  
  // Obtener todas las sucursales
  getAllSucursales(): Observable<SucursalModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<SucursalModel[]>(`${this.baseUrl}/all`, { headers });
  }
  
  // Agregar una nueva sucursal
  addSucursal(sucursal: any): Observable<SucursalModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<SucursalModel>(`${this.baseUrl}`, sucursal, { headers });
  }
  
  // Actualizar una sucursal
  updateSucursal(sucursal: any): Observable<ResponseModel<SucursalModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.put<ResponseModel<SucursalModel>>(`${this.baseUrl}/actualizar/${sucursal.id}`, sucursal, { headers });
  }
  
  // Eliminar una sucursal
  deleteSucursal(sucursalId: number): Observable<ResponseModel<SucursalModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.delete<ResponseModel<SucursalModel>>(`${this.baseUrl}/${sucursalId}`, { headers });
  }
}
