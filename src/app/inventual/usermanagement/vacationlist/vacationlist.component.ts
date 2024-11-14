import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalesInterfaceData, salesReport } from '../../data/salesReport';
import { UsuarioModel } from '../../models/empleado.model';
import { Observable } from 'rxjs';
import { VacacionesModel } from '../../models/vacaciones.model';
import { PdfreportService } from '../../services/reportes/pdfreport.service';
import { Store } from '@ngxs/store';
import { VacacionesState } from '../../state-management/vacacion/vacacion.state';
import { EmpleadosState } from '../../state-management/empleado/empleado.state';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteVacacion, GetVacacion } from '../../state-management/vacacion/vacacion.action';
import { GetEmpleado } from '../../state-management/empleado/empleado.action';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CsvreportService } from '../../services/reportes/csvreport.service';
import { PermisosAppService } from '../../services/permisos-app.service';


@Component({
  selector: 'app-vacationlist',
  templateUrl: './vacationlist.component.html',
  styleUrls: ['./vacationlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VacationlistComponent implements AfterViewInit {

  vacaciones$: Observable<VacacionesModel[]>;
  usuarios$: Observable<UsuarioModel[]>;
  usuarios: UsuarioModel[] = [];  
  usuarioslist: UsuarioModel[] = [];

  displayedColumns: string[] = [
    'select',
    'id',
    'usuarios',
    'fechaInicio',
    'fechaFin',
    'aprobacion',
    'action',
  ];
  dataSource: MatTableDataSource<VacacionesModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<VacacionesModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService, public permisosAppService: PermisosAppService) {
    // Assign your data array to the data source
    this.vacaciones$ = this.store.select(VacacionesState.getVacaciones);
    this.usuarios$ = this.store.select(EmpleadosState.getEmpleados);
  }

  generarPDF() {
    const vacacionesSeleccionados = this.selection.selected;

    this.usuarios$.subscribe((usuarios: UsuarioModel[]) => {
      this.usuarioslist = usuarios;
    });
    this.pdfreportService.vacacionespdf(vacacionesSeleccionados, this.usuarioslist);
  }

  generarCSV() {
    const vacacionesSeleccionados = this.selection.selected;

    this.usuarios$.subscribe((usuarios: UsuarioModel[]) => {
      this.usuarioslist = usuarios;
    });
    this.csvreportService.vacacionescsv(vacacionesSeleccionados, this.usuarioslist);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  eliminarVacacion(id: number) {
    this.store.dispatch(new DeleteVacacion(id)).subscribe({
      next: () => {
        console.log('Vacacion eliminada exitosamente');
        this.openSnackBar('Vacacion eliminada correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminada Vacacion:', error);
        this.openSnackBar('Vacacion no se pudo eliminar', 'Cerrar');
      }
    });
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
  checkboxLabel(row?: VacacionesModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  //sidebar menu activation start
  menuSidebarActive: boolean = false;
  myfunction() {
    if (this.menuSidebarActive == false) {
      this.menuSidebarActive = true;
    } else {
      this.menuSidebarActive = false;
    }
  }
  //sidebar menu activation end

  // Función para obtener el nombre del sucursal por ID
  getUserName(id: number): string {
    if (!this.usuarios.length) {
      return 'Cargando...'; // Si los sucursal aún no se han cargado
    }
    const usuario = this.usuarios.find((r) => r.id === id);
    return usuario ? usuario.nombre+" "+usuario.primerApellido+" "+usuario.segundoApellido : 'Sin Usuario';  // Devuelve el nombre del sucursal o "Sin sucursal" si no se encuentra
  }

  ngOnInit(): void {
    // Despacha la acción para obtener los usuarios
    this.store.dispatch([new GetEmpleado(), new GetVacacion()]);

    // Suscríbete al observable para actualizar el dataSource
    this.vacaciones$.subscribe((vacaciones) => {
      this.dataSource.data = vacaciones; // Asigna los datos al dataSource
    });

    this.usuarios$.subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }
}
