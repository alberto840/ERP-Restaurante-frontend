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
  private baseUrl = environment.apiUrl+'api/descuentos';

  constructor(private http: HttpClient) {}
  
  // Obtener todos los descuentos
  getAllDescuentos(): Observable<DescuentosModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<DescuentosModel[]>(`${this.baseUrl}/all`, { headers });
  }
  
  // Agregar un nuevo descuento
  addDescuento(descuento: any): Observable<ResponseModel<DescuentosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<ResponseModel<DescuentosModel>>(`${this.baseUrl}`, descuento, { headers });
  }
  
  // Actualizar un descuento
  updateDescuento(descuento: any): Observable<DescuentosModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.put<DescuentosModel>(`${this.baseUrl}/${descuento.id}`, descuento, { headers });
  }
  
  // Eliminar un descuento
  deleteDescuento(descuentoId: number): Observable<ResponseModel<DescuentosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.delete<ResponseModel<DescuentosModel>>(`${this.baseUrl}/${descuentoId}`, { headers });
  }
  
}
