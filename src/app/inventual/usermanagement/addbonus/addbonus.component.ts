import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BonosModel } from '../../models/bonos.model';
import { Observable } from 'rxjs';
import { AddBono } from '../../state-management/bono/bono.action';
import { Store } from '@ngxs/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { CsvreportService } from '../../services/reportes/csvreport.service';

@Component({
  selector: 'app-addbonus',
  templateUrl: './addbonus.component.html',
  styleUrls: ['./addbonus.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddbonusComponent implements OnInit {
  checked = false;
  disabled = false;
  
  bono: BonosModel = {
    id: 0,
    nombre: '',
    monto: 0
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

  agregarBono() {
    if (!this.bono.nombre || !this.bono.monto) {
      this.openSnackBar('Debe completar todos los campos', 'Cerrar');
      return;
    }     
    if (this.bono.nombre.length < 3 || this.bono.nombre.length > 50) {
      this.openSnackBar('El nombre tiene que estar entre 3 y 50 caracteres', 'Cerrar');
      return;
    }
    if (this.bono.monto < 1) {
      this.openSnackBar('El monto tiene que ser positivo arriba de 0', 'Cerrar');
      return;
    }
    
    this.store.dispatch(new AddBono(this.bono)).subscribe({
      next: () => {
        this.openSnackBar('Bono actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar Bono:', error);
        this.openSnackBar('No se pudo actualizar Bono', 'Cerrar');
      }
    });
    this.bono = {
      id: 0,
      nombre: '',
      monto: 0
    };
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  //sidebar menu activation end
  
  hide = true;
  
    constructor(private store: Store, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService) {
    }
  
    ngOnInit(): void {
    }
  
}