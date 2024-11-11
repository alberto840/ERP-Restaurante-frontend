import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { SalariosModel } from '../models/salarios.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalarioService {
  private baseUrl = environment.apiUrl+'api/historialsalarios';

  constructor(private http: HttpClient) {}

  getAllSalarios(): Observable<ResponseModel<SalariosModel[]>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ResponseModel<SalariosModel[]>>(`${this.baseUrl}/all`, { headers });
  }

  addSalario(salario: SalariosModel): Observable<ResponseModel<SalariosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ResponseModel<SalariosModel>>(`${this.baseUrl}`, salario, { headers });
  }

  updateSalario(salario: SalariosModel): Observable<ResponseModel<SalariosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ResponseModel<SalariosModel>>(`${this.baseUrl}/${salario.id}`, salario, { headers });
  }

  deleteSalario(salarioId: number): Observable<ResponseModel<SalariosModel>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<ResponseModel<SalariosModel>>(`${this.baseUrl}/${salarioId}`, { headers });
  }
}
