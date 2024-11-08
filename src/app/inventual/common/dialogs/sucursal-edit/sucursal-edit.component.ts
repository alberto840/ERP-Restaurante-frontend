import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { SucursalModel } from 'src/app/inventual/models/sucursal.model';
import { DialogData } from 'src/app/inventual/services/dialogs/dialogs.service';
import { GetSucursal, UpdateSucursal } from 'src/app/inventual/state-management/sucursal/sucursal.action';

@Component({
  selector: 'app-sucursal-edit',
  templateUrl: './sucursal-edit.component.html',
  styleUrls: ['./sucursal-edit.component.scss']
})
export class SucursalEditComponent implements OnInit {
  sucursal: SucursalModel = {
    id: 0,
    nombre: '',
    direccion: ''
  };

  constructor(private store: Store, private dialog: MatDialog,
    public dialogRef: MatDialogRef<SucursalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
      this.sucursal = { ...data.sucursal };
    }

  ngOnInit(): void {
    this.store.dispatch(new GetSucursal());
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  actualizarSucursal() {
    this.store.dispatch(new UpdateSucursal(this.sucursal)).subscribe({
      next: () => {
        this.openSnackBar('Sucursal actualizada correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar marca:', error);
        this.openSnackBar('No se pudo actualizar la Sucursal', 'Cerrar');
      }
    });
    this.cerrarDialog();
  }

  cerrarDialog() {
    this.dialog.closeAll();
  }
}