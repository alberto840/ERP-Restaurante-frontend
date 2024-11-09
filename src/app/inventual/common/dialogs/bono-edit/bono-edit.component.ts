import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { BonosModel } from 'src/app/inventual/models/bonos.model';
import { DialogData } from 'src/app/inventual/services/dialogs/dialogs.service';
import { UpdateBono } from 'src/app/inventual/state-management/bono/bono.action';

@Component({
  selector: 'app-bono-edit',
  templateUrl: './bono-edit.component.html',
  styleUrls: ['./bono-edit.component.scss']
})
export class BonoEditComponent implements OnInit {  
  hide = true;
  checked = false;
  disabled = false;
  
  bono: BonosModel = {
    id: 0,
    nombre: '',
    monto: 0
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<BonoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.bono = { ...data.bono };
    }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarBono() {
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
    
    this.store.dispatch(new UpdateBono(this.bono)).subscribe({
      next: () => {
        this.openSnackBar('Bono actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar Bono:', error);
        this.openSnackBar('No se pudo actualizar Bono', 'Cerrar');
      }
    });
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}