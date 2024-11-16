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
import { UsuarioModel, UsuarioStringModel } from '../../models/empleado.model';
import { RolModel } from '../../models/rol.model';
import { map, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { PdfreportService } from '../../services/reportes/pdfreport.service';
import { EmpleadosState } from '../../state-management/empleado/empleado.state';
import { RolesState } from '../../state-management/rol/rol.state';
import { DeleteEmpleado, GetEmpleado } from '../../state-management/empleado/empleado.action';
import { GetRol } from '../../state-management/rol/rol.action';
import { GetSucursal } from '../../state-management/sucursal/sucursal.action';
import { SucursalModel } from '../../models/sucursal.model';
import { SucursalState } from '../../state-management/sucursal/sucursal.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { CsvreportService } from '../../services/reportes/csvreport.service';
import { PermisosAppService } from '../../services/permisos-app.service';
import { GetPermisosRol } from '../../state-management/permisos-rol/permisos-rol.action';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserlistComponent implements AfterViewInit {
  usuarios$: Observable<UsuarioModel[]>;
  roles$: Observable<RolModel[]>;
  roles: RolModel[] = [];
  sucursales$: Observable<SucursalModel[]>;
  sucursales: SucursalModel[] = [];
  
  roleslist: RolModel[] = [];
  sucursaleslist: SucursalModel[] = [];

  displayedColumns: string[] = [
    'select',
    'nombre',
    'correo',
    'fechaIngreso',
    'estado',
    'direccion',
    'fechanacimiento',
    'telefono',
    'rol',
    'sucursal',
    'action',
  ];
  dataSource: MatTableDataSource<UsuarioStringModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<UsuarioModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService, public permisosAppService: PermisosAppService) {
    // Assign your data array to the data source
    this.usuarios$ = this.store.select(EmpleadosState.getEmpleados);
    this.roles$ = this.store.select(RolesState.getRoles);
    this.sucursales$ = this.store.select(SucursalState.getSucursales);
  }

  generarPDF() {
    const usuariosSeleccionados = this.selection.selected;

    this.roles$.subscribe((roles: RolModel[]) => {
      this.roleslist = roles;
    });
    this.sucursales$.subscribe((sucursales: SucursalModel[]) => {
      this.sucursaleslist = sucursales;
    });
    this.pdfreportService.userpdf(usuariosSeleccionados, this.roleslist, this.sucursaleslist);
  }

  generarCSV() {
    const usuariosSeleccionados = this.selection.selected;

    this.roles$.subscribe((roles: RolModel[]) => {
      this.roleslist = roles;
    });
    this.sucursales$.subscribe((sucursales: SucursalModel[]) => {
      this.sucursaleslist = sucursales;
    });
    this.csvreportService.usercsv(usuariosSeleccionados, this.roleslist, this.sucursaleslist);
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
  
  eliminarEmpleado(id: number) {
    this.store.dispatch(new DeleteEmpleado(id)).subscribe({
      next: () => {
        console.log('Empleado eliminada exitosamente');
        this.openSnackBar('Empleado eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminada Empleado:', error);
        this.openSnackBar('Empleado no se pudo eliminar', 'Cerrar');
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
  checkboxLabel(row?: UsuarioModel): string {
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
  getSucursalName(id: number): string {
    if (!this.sucursales.length) {
      return 'Cargando...'; // Si los sucursal aún no se han cargado
    }
    const sucursal = this.sucursales.find((r) => r.id === id);
    return sucursal ? sucursal.nombre : 'Sin sucursal';  // Devuelve el nombre del sucursal o "Sin sucursal" si no se encuentra
  }  

  // Función para obtener el nombre del rol por ID
  getRolName(id: number): string {
    if (!this.roles.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const rol = this.roles.find((r) => r.id === id);
    return rol ? rol.nombre : 'Sin Rol';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  transformarDatosString(){
    const listaActual$: Observable<UsuarioModel[]> = this.usuarios$;
    const listaActualizada$: Observable<UsuarioStringModel[]> = listaActual$.pipe(
      map((objetos: UsuarioModel[]) =>
        objetos.map((objeto: UsuarioModel) => ({
          id: objeto.id,
          nombre: objeto.nombre,
          primerApellido: objeto.primerApellido,
          segundoApellido: objeto.segundoApellido,
          correo: objeto.correo,
          password: objeto.password,
          fechaIngreso: objeto.fechaIngreso,
          estado: objeto.estado,
          direccion: objeto.direccion,
          edad: objeto.edad,
          telefono: objeto.telefono,
          //hasta tener el endpoint de roles
          rolesId: objeto.rolesId,
          sucursalId: objeto.sucursalId,
          rolesIdstring: this.getRolName(objeto.rolesId),
          sucursalIdstring: this.getSucursalName(objeto.sucursalId),
        }))
      )
    );    
    return listaActualizada$;
  }

  ngOnInit(): void {
    // Despacha la acción para obtener los usuarios
    this.store.dispatch([new GetEmpleado(), new GetRol(), new GetSucursal(), new GetPermisosRol()]);

    // Suscríbete al observable para actualizar el dataSource
    this.transformarDatosString().subscribe((users) => {
      this.dataSource.data = users; // Asigna los datos al dataSource
    });

    this.roles$.subscribe((roles) => {
      this.roles = roles;
    });

    this.sucursales$.subscribe((sucursales) => {
      this.sucursales = sucursales;
    });
  }
}
