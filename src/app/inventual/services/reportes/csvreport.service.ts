import { Injectable } from '@angular/core';
import { SucursalModel } from '../../models/sucursal.model';
import { ContratoModel } from '../../models/contrato.model';
import { UsuarioModel } from '../../models/empleado.model';
import { RolModel } from '../../models/rol.model';

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

  usercsv(userlist: UsuarioModel[], rollist: RolModel[], sucursallist: SucursalModel[]) {
    const headers = ['ID', 'Nombre', 'Correo', 'FechaIngreso', 'Estado', 'Direccion', 'Edad', 'Telefono', 'Rol', 'Sucursal'];
  
    const csvData = [
      headers.join(','), // Encabezados
      ...userlist.map(user => {
        const userRole = rollist.find(role => role.id === user.rolesId);
        const userSucursal = sucursallist.find(sucursal => sucursal.id === user.sucursalId);
  
        return [
          user.id,
          `${user.nombre} ${user.primerApellido} ${user.segundoApellido}`,
          user.correo,
          user.fechaIngreso.toString(),
          user.estado ? 'Activo' : 'Inactivo',
          user.direccion,
          user.edad.toString(),
          user.telefono,
          userRole ? userRole.nombre : 'Sin Rol',
          userSucursal ? userSucursal.nombre : 'Sin Sucursal'
        ].join(',')
      })
    ].join('\n');
  
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Reporte-Usuarios.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
