import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContratoModel } from '../models/contrato.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private baseUrl = environment.apiUrl + 'api/contratos';

  constructor(private http: HttpClient) {}
  
  getAllContratos(): Observable<ContratoModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ContratoModel[]>(`${this.baseUrl}/all`, { headers });
  }
  
  addContrato(contrato: ContratoModel): Observable<ContratoModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ContratoModel>(`${this.baseUrl}/create`, contrato, { headers });
  }
  
  updateContrato(contrato: ContratoModel): Observable<ContratoModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ContratoModel>(`${this.baseUrl}/update/${contrato.id}`, contrato, { headers });
  }
  
  deleteContrato(contratoId: number): Observable<ResponseModel<ContratoModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<ContratoModel>>(`${this.baseUrl}/delete/${contratoId}`, { headers });
  }
  
  
}
