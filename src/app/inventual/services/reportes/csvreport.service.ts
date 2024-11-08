import { Injectable } from '@angular/core';
import { SucursalModel } from '../../models/sucursal.model';

@Injectable({
  providedIn: 'root'
})
export class CsvreportService { 

  sucursalcsv(sucursallist: SucursalModel[]) {
    
    const headers = ['ID', 'Nombre','Direccion'];
    const data = sucursallist.map((sucursal, index) => [
      sucursal.id,
      sucursal.nombre,
      sucursal.direccion
    ]);
  
    const csvData = [
      headers.join(','), // Encabezados
      ...sucursallist.map(sucursal => {
        return [
          sucursal.id,
          sucursal.nombre,
          sucursal.direccion
        ].join(',');
      })
    ].join('\n');
  
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Reporte-Sucursal.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
