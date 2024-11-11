import { Component, OnInit } from '@angular/core';
import { DescuentosModel } from '../../models/descuentos.model';
import { Observable } from 'rxjs';
import { SalariosModel } from '../../models/salarios.model';
import { AddSalario, DeleteSalario } from '../../state-management/salario/salario.action';
import { UsuarioModel } from '../../models/empleado.model';
import { DiscountsState } from '../../state-management/descuentos/descuento.state';
import { EmpleadosState } from '../../state-management/empleado/empleado.state';
import { GetDescuento } from '../../state-management/descuentos/descuento.action';
import { GetEmpleado } from '../../state-management/empleado/empleado.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { CsvreportService } from '../../services/reportes/csvreport.service';
import { PdfreportService } from '../../services/reportes/pdfreport.service';

@Component({
  selector: 'app-registro-salarios',
  templateUrl: './registro-salarios.component.html',
  styleUrls: ['./registro-salarios.component.scss']
})
export class RegistroSalariosComponent implements OnInit {
  checked = false;
  disabled = false;
  
  descuentos$: Observable<DescuentosModel[]>; // Observable que contiene los roles
  usuarios$: Observable<UsuarioModel[]>; // Observable que contiene los roles
  salario: SalariosModel = {
    id: undefined,
    salario: 0,
    fechapago: new Date(),
    descuentoId: 0,
    usuariosId: 0
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

  agregarSalario() {
    if (!this.salario.salario || !this.salario.fechapago || !this.salario.descuentoId || !this.salario.usuariosId) {
      this.openSnackBar('Debe llenar todos los campos', 'Cerrar');
      return;
    }
    if(this.salario.salario < 0){
      this.openSnackBar('El salario no puede ser negativo', 'Cerrar');
      return;
    }

    this.store.dispatch(new AddSalario(this.salario)).subscribe({
      next: () => {
        console.log('Salario agregada exitosamente');
        this.openSnackBar('Salario agregado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al agregada Salario:', error);
        this.openSnackBar('Salario no se pudo agregar', 'Cerrar');
      }
    });
    this.salario = {
      id: undefined,
      salario: 0,
      fechapago: new Date(),
      descuentoId: 0,
      usuariosId: 0
    };
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  eliminarSalario(id: number) {
    this.store.dispatch(new DeleteSalario(id)).subscribe({
      next: () => {
        console.log('Salario eliminada exitosamente');
        this.openSnackBar('Salario eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Salario:', error);
        this.openSnackBar('Salario no se pudo eliminar', 'Cerrar');
      }
    });
  }

  //sidebar menu activation end
  
  hide = true;
  
  constructor(private store: Store, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService) {
      this.descuentos$ = this.store.select(DiscountsState.getDiscounts);
      this.usuarios$ = this.store.select(EmpleadosState.getEmpleados);
    }
  
    ngOnInit(): void {
      this.store.dispatch([new GetDescuento(), new GetEmpleado()]);
    }
  
}

