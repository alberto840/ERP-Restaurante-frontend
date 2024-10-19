import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AccesoDialogsService } from '../../common/dialogs/acceso-dialogs.service';
import { UsuarioModel } from '../../models/empleado.model';
import { Observable } from 'rxjs';
import { DescuentosModel } from '../../models/descuentos.model';
import { AddDescuento } from '../../state-management/descuentos/descuento.action';
import { Store } from '@ngxs/store';
import { EmpleadosState } from '../../state-management/empleado/empleado.state';
import { GetEmpleado } from '../../state-management/empleado/empleado.action';

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

  agregarDescuento() {
    this.store.dispatch(new AddDescuento(this.descuento));
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
  
    constructor(private store: Store) {
      this.users$ = this.store.select(EmpleadosState.getEmpleados);
    }
  
    ngOnInit(): void {
      this.store.dispatch([new GetEmpleado()]);
    }
  
}
