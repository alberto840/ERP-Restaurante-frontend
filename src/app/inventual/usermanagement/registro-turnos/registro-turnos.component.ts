import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TurnoModel } from '../../models/horarios.model';
import { AddTurno, DeleteTurno, GetTurno, UpdateTurno } from '../../state-management/turno/turno.action';
import { Store } from '@ngxs/store';
import { PdfreportService } from '../../services/reportes/pdfreport.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TurnoState } from '../../state-management/turno/turno.state';
import { DateTime } from 'luxon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { CsvreportService } from '../../services/reportes/csvreport.service';

@Component({
  selector: 'app-registro-turnos',
  templateUrl: './registro-turnos.component.html',
  styleUrls: ['./registro-turnos.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistroTurnosComponent {
  turno: TurnoModel = {
    id: 0,
    nombre: '',
    descripcion: '',
    horaInicio: new Date(),
    horaFin: new Date(),
    dia: ''
  };
  
  agregarTurno() {
    if (!this.turno.nombre || !this.turno.descripcion || !this.turno.horaInicio || !this.turno.horaFin || !this.turno.dia) {
      this.openSnackBar('Debe completar todos los campos', 'Cerrar');
      return;
    }
    if (this.turno.nombre.length < 3 || this.turno.nombre.length > 50) {
      this.openSnackBar('El nombre tiene que estar entre 3 y 50 caracteres', 'Cerrar');
      return;
    }
    if (this.turno.descripcion.length < 3 || this.turno.descripcion.length > 50) {
      this.openSnackBar('La descripción tiene que estar entre 3 y 50 caracteres', 'Cerrar');
      return;
    }
    if (this.turno.horaInicio > this.turno.horaFin) {
      this.openSnackBar('La hora de inicio no puede ser mayor a la hora de fin', 'Cerrar');
      return;
    }
    const horaInicio = this.turno.horaInicio;
    const horaFin = this.turno.horaFin;
    
    // Crear las horas y restar las 4 horas adicionales
    let inicio = new Date('2024-10-01T' + horaInicio + ':00');
    inicio.setHours(inicio.getHours() - 4);

    let fin = new Date('2024-10-01T' + horaFin + ':00');
    fin.setHours(fin.getHours() - 4);

    this.turno.horaInicio = inicio;
    this.turno.horaFin = fin;
    this.store.dispatch(new AddTurno(this.turno)).subscribe({
      next: () => {
        this.openSnackBar('Turno creado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al crear turno:', error);
        this.openSnackBar('No se pudo crear Turno', 'Cerrar');
      }
    });
    this.turno = {
      id: 0,
      nombre: '',
      descripcion: '',
      horaInicio: new Date(),
      horaFin: new Date(),
      dia: ''
    };
  }
  
  eliminarTurno(id: number) {
    this.store.dispatch(new DeleteTurno(id)).subscribe({
      next: () => {
        console.log('Turno eliminado exitosamente');
        this.openSnackBar('Turno eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminado Turno:', error);
        this.openSnackBar('Turno no se pudo eliminar', 'Cerrar');
      }
    });
  }
  
  actualizarTurno(turno: TurnoModel) {    
    this.store.dispatch(new UpdateTurno(this.turno));
  }
  
  turnos$: Observable<TurnoModel[]>;
  //sidebar menu activation start
  menuSidebarActive: boolean = false;
  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive;
  }
  //sidebar menu activation end
  
  displayedColumns: string[] = ['select', 'nombre', 'descripcion','horaInicio','horaFin','dia','action'];
  dataSource: MatTableDataSource<TurnoModel> = new MatTableDataSource(); 
  selection = new SelectionModel<TurnoModel>(true, []);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(private store: Store, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService) {
    this.turnos$ = this.store.select(TurnoState.getTurnos);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  generarPDF() {
    const turnosSeleccionados = this.selection.selected;
    this.pdfreportService.turnospdf(turnosSeleccionados);
  }

  generarCSV() {
    const turnosSeleccionados = this.selection.selected;
    this.csvreportService.turnoscsv(turnosSeleccionados);
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
  
    this.selection.select(...this.dataSource.data);
  }
  
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  
  ngOnInit(): void {
    // Despacha la acción para obtener las empresas
    this.store.dispatch(new GetTurno());
  
    // Suscríbete al observable para actualizar el dataSource
    this.turnos$.subscribe((turno) => {
      this.dataSource.data = turno; // Asigna los datos al dataSource
    });
  }
  
}
