import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserInterfaceData, userData } from '../../data/userData';
import { AsistenciaModel } from '../../models/asistencia.model';
import { UsuarioModel } from '../../models/empleado.model';
import { AsistenciaState } from '../../state-management/asistencia/asistencia.state';
import { GetAsistencia } from '../../state-management/asistencia/asistencia.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { CsvreportService } from '../../services/reportes/csvreport.service';
import { PdfreportService } from '../../services/reportes/pdfreport.service';
import { GetEmpleado } from '../../state-management/empleado/empleado.action';
import { EmpleadosState } from '../../state-management/empleado/empleado.state';
import { PermisosAppService } from '../../services/permisos-app.service';

@Component({
  selector: 'app-attendancelist',
  templateUrl: './attendancelist.component.html',
  styleUrls: ['./attendancelist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AttendancelistComponent implements AfterViewInit {
  asistencias$: Observable<AsistenciaModel[]>;
  usuarios$: Observable<UsuarioModel[]>;
  usuarios: UsuarioModel[] = [];
  
  usuarioslist: UsuarioModel[] = [];

  displayedColumns: string[] = [
    'select',
    'usuarioId',
    'retraso',
    'horaMarcada',
    'fecha',
    'tipoMarcado'
  ];
  dataSource: MatTableDataSource<AsistenciaModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<AsistenciaModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService, public permisosAppService: PermisosAppService) {
    // Assign your data array to the data source
    this.usuarios$ = this.store.select(EmpleadosState.getEmpleados);
    this.asistencias$ = this.store.select(AsistenciaState.getAsistencias);
  }

  generarPDF() {
    const asistenciasSeleccionados = this.selection.selected;

    this.usuarios$.subscribe((usuarios: UsuarioModel[]) => {
      this.usuarioslist = usuarios;
    });
    this.pdfreportService.asistenciapdf(asistenciasSeleccionados, this.usuarioslist);
  }

  generarCSV() {
    const asistenciasSeleccionados = this.selection.selected;

    this.usuarios$.subscribe((usuarios: UsuarioModel[]) => {
      this.usuarioslist = usuarios;
    });
    this.csvreportService.asistenciacsv(asistenciasSeleccionados, this.usuarioslist);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    // Encuentra el ID del usuario con el nombre ingresado en el filtro
    let usuario: UsuarioModel | undefined;
    this.usuarios$.subscribe((usuarios) => {
      usuario = usuarios.find(user => user.nombre.toLowerCase() === filterValue);
    });
    //const usuario = this.usuarios.find(user => user.nombre.toLowerCase() === "Luis");
  
    // Si encuentra un usuario, filtra por su ID; de lo contrario, aplica el filtro como texto
    if (usuario) {
      console.log("id"+usuario.id.toString());
      this.dataSource.filter = usuario.id.toString();
    } else {
      console.log(filterValue+" "+this.usuarios.length);
      this.dataSource.filter = filterValue;
    }
  
    // Reinicia la paginación si está activa
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
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
  checkboxLabel(row?: AsistenciaModel): string {
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
    return usuario ? usuario.nombre : 'Sin usuario';  // Devuelve el nombre del sucursal o "Sin sucursal" si no se encuentra
  }  

  ngOnInit(): void {
    // Despacha la acción para obtener los usuarios
    this.store.dispatch([new GetEmpleado(), new GetAsistencia()]);

    // Suscríbete al observable para actualizar el dataSource
    this.asistencias$.subscribe((asistencias) => {
      this.dataSource.data = asistencias; // Asigna los datos al dataSource
    });

    this.usuarios$.subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }
}
