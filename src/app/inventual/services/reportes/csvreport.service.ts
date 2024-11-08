import { Injectable } from '@angular/core';
import { SucursalModel } from '../../models/sucursal.model';
import { ContratoModel } from '../../models/contrato.model';
import { UsuarioModel } from '../../models/empleado.model';

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
  contratopdf(contratolist: ContratoModel[], userlist: UsuarioModel[]) {
    const headers = ['ID', 'Empleado', 'Fecha Inicio', 'Fecha Conclusion', 'Fecha Contrato', 'Identificador'];
  
    const csvData = [
      headers.join(','), // Encabezados
      ...contratolist.map(contrato => {
        const contratoUser = userlist.find(usuario => usuario.id === contrato.usuariosId);
  
        return [
          contrato.id,
          contratoUser ? contratoUser.nombre : 'Sin Usuario',
          contrato.fechaInicio.toString(),
          contrato.fechaConclusion.toString(),
          contrato.fechaContrato.toString(),
          contrato.identificador,
        ].join(',')
      })
    ].join('\n');
  
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Reporte-Contratos.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
