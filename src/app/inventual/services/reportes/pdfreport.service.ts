import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { UsuarioModel } from '../../models/empleado.model';
import { RolModel } from '../../models/rol.model';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { SucursalModel } from '../../models/sucursal.model';
import { VacacionesModel } from '../../models/vacaciones.model';
import { DescuentosModel } from '../../models/descuentos.model';
import { BonosModel } from '../../models/bonos.model';


@Injectable({
  providedIn: 'root'
})
export class PdfreportService {
  //Aqui se guarda los formatos para realizar los reportes en pdf
  userpdf(userlist: UsuarioModel[], rollist: RolModel[], sucursallist: SucursalModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Usuarios generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Nombre', 'Correo', 'FechaIngreso', 'Estado', 'Direccion', 'Edad', 'Telefono', 'Rol', 'Sucursal'];
    const data = userlist.map((user) => {
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
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-usuarios.pdf');
  }

  sucursalpdf(sucursallist: SucursalModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Sucursales generado: '+new Date().toLocaleString(), 10, 10);
    var fecha = new Date().toLocaleString();
    //doc.text('/n Fecha de generacion: '+fecha, 10, 10);

    const columns = ['ID', 'Nombre','Direccion'];
    const data = sucursallist.map((sucursal, index) => [
      sucursal.id,
      sucursal.nombre,
      sucursal.direccion
    ]);

    autoTable(doc, {
      head: [columns],
      body: data,
    })

    doc.save('informe-sucursales.pdf');
  }
  vacacionespdf(vacacioneslist: VacacionesModel[], userlist: UsuarioModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Vacaciones generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Usuario', 'Aprobacion', 'FechaInicio', 'FechaFin'];
    const data = vacacioneslist.map((vacacion) => {
      const vacacionUser = userlist.find(usuario => usuario.id === vacacion.usuariosId);
      return [
        vacacion.id,
        vacacion.fechaFin.toString(),
        vacacion.fechaInicio.toString(),
        vacacion.aprobacion ? 'Aprobado' : 'Rechazado',
        vacacionUser ? vacacionUser.nombre : 'Sin Usuario',
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-vacaciones.pdf');
  }

  descuentopdf(descuentolist: DescuentosModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Descuentos generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Tipo', 'Monto', 'Fecha', 'Justificacion'];
    const data = descuentolist.map((descuento) => {
      return [
        descuento.id,
        descuento.tipoDescuento,
        descuento.monto.toString(),
        descuento.fecha.toString(),
        descuento.justificacion,
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-descuentos.pdf');
  }

  bonospdf(bonolist: BonosModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Bonos generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Nombre', 'Monto'];
    const data = bonolist.map((bono) => {
      return [
        bono.id,
        bono.nombre,
        bono.monto.toString(),
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-bonos.pdf');
  }

  rolespdf(roleslist: RolModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Roles generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Nombre'];
    const data = roleslist.map((rol) => {
      return [
        rol.id,
        rol.nombre,
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-roles.pdf');
  }
}
