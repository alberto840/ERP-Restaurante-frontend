import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { BonosModel } from '../models/bonos.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BonosService {
  private baseUrl = environment.apiUrl+'api/bonos';

  constructor(private http: HttpClient) {}
  
  // Obtener todos los bonos
  getAllBonos(): Observable<BonosModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<BonosModel[]>(`${this.baseUrl}/all`, { headers });
  }
  
  // Agregar un nuevo bono
  addBono(bono: any): Observable<BonosModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<BonosModel>(`${this.baseUrl}/create`, bono, { headers });
  }
  
  // Actualizar un bono
  updateBono(bono: any): Observable<ResponseModel<BonosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.put<ResponseModel<BonosModel>>(`${this.baseUrl}/actualizar/${bono.id}`, bono, { headers });
  }
  
  // Eliminar un bono
  deleteBono(bonoId: number): Observable<ResponseModel<BonosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.delete<ResponseModel<BonosModel>>(`${this.baseUrl}/eliminar/${bonoId}`, { headers });
  }
  
}
