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
import { ContratoModel } from '../../models/contrato.model';
import { TurnoModel } from '../../models/horarios.model';
import { SalariosModel } from '../../models/salarios.model';
import { AsistenciaModel } from '../../models/asistencia.model';


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
  contratopdf(contratopdf: ContratoModel[], userlist: UsuarioModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Contratos generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Empleado', 'Fecha Inicio', 'Fecha Conclusion', 'Fecha Contrato', 'Identificador'];
    const data = contratopdf.map((contrato) => {
      const contratoUser = userlist.find(usuario => usuario.id === contrato.usuariosId);
      return [
        contrato.id,
        contratoUser ? contratoUser.nombre : 'Sin Usuario',
        contrato.fechaInicio.toString(),
        contrato.fechaConclusion.toString(),
        contrato.fechaContrato.toString(),
        contrato.identificador,
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-contratos.pdf');
  }

  turnospdf(turnolist: TurnoModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Turnos generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Nombre', 'Descripcion', 'Hora Inicio', 'Hora Fin', 'Dia'];
    const data = turnolist.map((turno) => {
      return [
        turno.id,
        turno.nombre,
        turno.descripcion,
        new Date(turno.horaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        new Date(turno.horaFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        turno.dia
      ];      
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-turnos.pdf');
  }

  historialSalariospdf(salarioslist: SalariosModel[], userlist: UsuarioModel[], descuentoslist: DescuentosModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Historial Salarios generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Nombre', 'Fecha Pago', 'Descuento', 'Salario', 'Total'];
    const data = salarioslist.map((salario) => {
      const userSalario = userlist.find(user => user.id === salario.usuariosId);
      const descuentoSalrio = descuentoslist.find(descuento => descuento.id === salario.descuentoId);
      return [
        salario.id,
        userSalario ? userSalario.nombre : 'Sin Usuario',
        salario.fechapago.toString(),
        descuentoSalrio ? descuentoSalrio.monto+" Bs." : 'Sin Descuento',
        salario.salario.toString()+" Bs.",
        descuentoSalrio ? (salario.salario - descuentoSalrio.monto)+" Bs." : salario.salario,
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-salarios.pdf');
  }

  asistenciapdf(asistencialist: AsistenciaModel[], userlist: UsuarioModel[]) {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    doc.text('Informe de Historial asistencia generado: ' + new Date().toLocaleString(), 10, 10);
    const fecha = new Date().toLocaleString();
    // doc.text('/n Fecha de generacion: ' + fecha, 10, 10);

    const columns = ['ID', 'Usuario', 'Retraso', 'Hora Marcada', 'Fecha', 'Tipo Marcado'];
    const data = asistencialist.map((asistencia) => {
      const userSalario = userlist.find(user => user.id === asistencia.usuarioId);
      return [
        asistencia.id,
        userSalario ? (userSalario.nombre+" "+userSalario.primerApellido) : 'Sin Usuario',
        asistencia.retraso ? 'Atrasado' : 'A tiempo',
        asistencia.horaMarcada.toString(),
        asistencia.fecha.toString(),
        asistencia.tipoMarcado.toString(),
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: data,
    });

    doc.save('informe-Asistencia.pdf');
  }
}
