import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalesInterfaceData, salesReport } from '../../data/salesReport';
import { SalariosModel, SalariosStringModel } from '../../models/salarios.model';
import { UsuarioModel } from '../../models/empleado.model';
import { map, Observable } from 'rxjs';
import { DescuentosModel } from '../../models/descuentos.model';
import { Store } from '@ngxs/store';
import { PdfreportService } from '../../services/reportes/pdfreport.service';
import { SelectionModel } from '@angular/cdk/collections';
import { EmpleadosState } from '../../state-management/empleado/empleado.state';
import { DiscountsState } from '../../state-management/descuentos/descuento.state';
import { SalariosState } from '../../state-management/salario/salario.state';
import { DeleteSalario, GetSalario } from '../../state-management/salario/salario.action';
import { GetEmpleado } from '../../state-management/empleado/empleado.action';
import { GetDescuento } from '../../state-management/descuentos/descuento.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { CsvreportService } from '../../services/reportes/csvreport.service';
import { PermisosAppService } from '../../services/permisos-app.service';

@Component({
  selector: 'app-salaryhistory',
  templateUrl: './salaryhistory.component.html',
  styleUrls: ['./salaryhistory.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SalaryhistoryComponent implements AfterViewInit {
  historialSalarios$: Observable<SalariosModel[]>;
  usuarios$: Observable<UsuarioModel[]>;
  usuarios: UsuarioModel[] = [];
  descuentos$: Observable<DescuentosModel[]>;
  descuentos: DescuentosModel[] = [];
  
  usuarioslist: UsuarioModel[] = [];
  descuentoslist: DescuentosModel[] = [];

  displayedColumns: string[] = [
    'select',
    'nombre',
    'fechapago',
    'salario',
    'desceunto',
    'total',
    'action',
  ];
  dataSource: MatTableDataSource<SalariosStringModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<SalariosModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService, public permisosAppService: PermisosAppService) {
    // Assign your data array to the data source
    this.usuarios$ = this.store.select(EmpleadosState.getEmpleados);
    this.descuentos$ = this.store.select(DiscountsState.getDiscounts);
    this.historialSalarios$ = this.store.select(SalariosState.getSalarios);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  generarPDF() {
    const salariosSeleccionados = this.selection.selected;

    this.descuentos$.subscribe((descuentos: DescuentosModel[]) => {
      this.descuentoslist = descuentos;
    });
    this.usuarios$.subscribe((usuarios: UsuarioModel[]) => {
      this.usuarioslist = usuarios;
    });
    this.pdfreportService.historialSalariospdf(salariosSeleccionados, this.usuarioslist, this.descuentoslist);
  }

  generarCSV() {
    const salariosSeleccionados = this.selection.selected;

    this.descuentos$.subscribe((descuentos: DescuentosModel[]) => {
      this.descuentoslist = descuentos;
    });
    this.usuarios$.subscribe((usuarios: UsuarioModel[]) => {
      this.usuarioslist = usuarios;
    });
    this.csvreportService.salariocsv(salariosSeleccionados, this.usuarioslist, this.descuentoslist);
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

  transformarDatosString(){
    const listaActual$: Observable<SalariosModel[]> = this.historialSalarios$;
    const listaActualizada$: Observable<SalariosStringModel[]> = listaActual$.pipe(
      map((objetos: SalariosModel[]) =>
        objetos.map((objeto: SalariosModel) => ({
          id: objeto.id,
          salario: objeto.salario,
          fechapago: objeto.fechapago,
          descuentoId: objeto.descuentoId,
          usuariosId: objeto.usuariosId,
          descuentoIdstring: this.getDiscountName(objeto.descuentoId).toString(),
          usuariosIdstring: this.getUserName(objeto.usuariosId),
        }))
      )
    );    
    return listaActualizada$;
  }
  
  eliminarHistorial(id: number) {
    this.store.dispatch(new DeleteSalario(id));
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
  checkboxLabel(row?: SalariosModel): string {
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
    return usuario ? (usuario.nombre+" "+usuario.primerApellido+" "+usuario.segundoApellido) : 'Sin usuarios';  // Devuelve el nombre del sucursal o "Sin sucursal" si no se encuentra
  }  

  // Función para obtener el nombre del rol por ID
  getDiscountName(id: number): number {
    if (!this.descuentos.length) {
      return 0; // Si los roles aún no se han cargado
    }
    const descuentos = this.descuentos.find((r) => r.id === id);
    return descuentos ? descuentos.monto : 0;  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  ngOnInit(): void {
    // Despacha la acción para obtener los usuarios
    this.store.dispatch([new GetEmpleado(), new GetDescuento(), new GetSalario()]);

    // Suscríbete al observable para actualizar el dataSource
    this.transformarDatosString().subscribe((salarios) => {
      this.dataSource.data = salarios; // Asigna los datos al dataSource
    });

    this.usuarios$.subscribe((usuarios) => {
      this.usuarios = usuarios;
    });

    this.descuentos$.subscribe((descuentos) => {
      this.descuentos = descuentos;
    });
  }
}
