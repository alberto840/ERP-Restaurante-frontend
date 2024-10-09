import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DescuentosModel } from '../models/descuentos.model';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescuentosService {
  private baseUrl = environment.apiUrl+'api/v1/descuentos';

  constructor(private http: HttpClient) {}
  
  // Obtener todos los descuentos
  getAllDescuentos(): Observable<ResponseModel<DescuentosModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<ResponseModel<DescuentosModel[]>>(`${this.baseUrl}`, { headers });
  }
  
  // Agregar un nuevo descuento
  addDescuento(descuento: any): Observable<ResponseModel<DescuentosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<ResponseModel<DescuentosModel>>(`${this.baseUrl}/crear`, descuento, { headers });
  }
  
  // Actualizar un descuento
  updateDescuento(descuento: any): Observable<ResponseModel<DescuentosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.put<ResponseModel<DescuentosModel>>(`${this.baseUrl}/actualizar/${descuento.id}`, descuento, { headers });
  }
  
  // Eliminar un descuento
  deleteDescuento(descuentoId: number): Observable<ResponseModel<DescuentosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.delete<ResponseModel<DescuentosModel>>(`${this.baseUrl}/eliminar/${descuentoId}`, { headers });
  }
  
}
