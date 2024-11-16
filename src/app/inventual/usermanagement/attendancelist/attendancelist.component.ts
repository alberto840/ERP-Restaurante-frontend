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
import { AsistenciaModel, AsistenciaStringModel } from '../../models/asistencia.model';
import { UsuarioModel } from '../../models/empleado.model';
import { AsistenciaState } from '../../state-management/asistencia/asistencia.state';
import { GetAsistencia } from '../../state-management/asistencia/asistencia.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { CsvreportService } from '../../services/reportes/csvreport.service';
import { PdfreportService } from '../../services/reportes/pdfreport.service';
import { GetEmpleado } from '../../state-management/empleado/empleado.action';
import { EmpleadosState } from '../../state-management/empleado/empleado.state';
import { PermisosAppService } from '../../services/permisos-app.service';
import { GetPermisosRol } from '../../state-management/permisos-rol/permisos-rol.action';

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
  dataSource: MatTableDataSource<AsistenciaStringModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<AsistenciaModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService, public permisosAppService: PermisosAppService) {
    // Assign your data array to the data source
    this.usuarios$ = this.store.select(EmpleadosState.getEmpleados);
    this.asistencias$ = this.store.select(AsistenciaState.getAsistencias);
    this.transformarDatosString();
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

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

  getTipoMarcado(tipoMarcado: number): string {
    switch (tipoMarcado) {
      case 1:
        return 'Huella';
      case 15:
        return 'Facial';
      case 20:
        return 'Codigo';
      default:
        return 'Desconocido';
    }
  }

  transformarDatosString(){
    const asistenciaModel$: Observable<AsistenciaModel[]> = this.asistencias$;
    const asistenciaStringModel$: Observable<AsistenciaStringModel[]> = asistenciaModel$.pipe(
      map((asistencias: AsistenciaModel[]) =>
        asistencias.map((asistencia: AsistenciaModel) => ({
          id: asistencia.id,
          fecha: asistencia.fecha,
          horaMarcada: asistencia.horaMarcada,
          tipoMarcado: asistencia.tipoMarcado,
          tipoMarcadostring: this.getTipoMarcado(asistencia.tipoMarcado),
          retraso: asistencia.retraso,
          usuarioId: asistencia.usuarioId, // Convertimos usuarioId a string
          usuarioIdstring: this.getUserName(asistencia.usuarioId),
        }))
      )
    );    
    return asistenciaStringModel$;
  }

  ngOnInit(): void {
    // Despacha la acción para obtener los usuarios
    this.store.dispatch([new GetEmpleado(), new GetAsistencia(), new GetPermisosRol()]);

    // Suscríbete al observable para actualizar el dataSource
    this.transformarDatosString().subscribe((asistencias) => {
      this.dataSource.data = asistencias; // Asigna los datos al dataSource
    });

    this.usuarios$.subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }
}
