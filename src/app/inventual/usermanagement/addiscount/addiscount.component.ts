import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AccesoDialogsService } from '../../common/dialogs/acceso-dialogs.service';
import { UsuarioModel } from '../../models/empleado.model';
import { Observable } from 'rxjs';
import { DescuentosModel } from '../../models/descuentos.model';
import { AddDescuento } from '../../state-management/descuentos/descuento.action';
import { Store } from '@ngxs/store';
import { EmpleadosState } from '../../state-management/empleado/empleado.state';
import { GetEmpleado } from '../../state-management/empleado/empleado.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { CsvreportService } from '../../services/reportes/csvreport.service';
import { PermisosAppService } from '../../services/permisos-app.service';
import { GetPermisosRol } from '../../state-management/permisos-rol/permisos-rol.action';

@Component({
  selector: 'app-addiscount',
  templateUrl: './addiscount.component.html',
  styleUrls: ['./addiscount.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddiscountComponent implements OnInit {
  checked = false;
  disabled = false;
  
  users$: Observable<UsuarioModel[]>; // Observable que contiene los users
  descuento: DescuentosModel = {
    id: 0,
    tipoDescuento: '',
    monto: 0,
    fecha: new Date(),
    justificacion: ''
  };

  //sidebar menu activation start
  menuSidebarActive:boolean=false;
  myfunction(){
    if(this.menuSidebarActive==false){
      this.menuSidebarActive=true;
    }
    else {
      this.menuSidebarActive=false;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  agregarDescuento() {
    if (!this.descuento.tipoDescuento || !this.descuento.monto || !this.descuento.justificacion) {
      this.openSnackBar('Por favor complete todos los campos', 'Cerrar');
      return;
    }
    if(this.descuento.monto < 1) {
      this.openSnackBar('El monto debe ser positivo', 'Cerrar');
      return;
    }
    this.store.dispatch(new AddDescuento(this.descuento)).subscribe({
      next: () => {
        this.openSnackBar('Descuento registrado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al registrar Descuento:', error);
        this.openSnackBar('No se pudo registrar Descuento', 'Cerrar');
      }
    });
    this.descuento = {
      id: 0,
      tipoDescuento: '',
      monto: 0,
      fecha: new Date(),
      justificacion: ''
    };
  }

  //sidebar menu activation end
  
  hide = true;
  
    constructor(private store: Store, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService, public permisosAppService: PermisosAppService) {
      this.users$ = this.store.select(EmpleadosState.getEmpleados);
    }
  
    ngOnInit(): void {
      this.store.dispatch([new GetEmpleado(),new GetPermisosRol()]);
    }
  
}
