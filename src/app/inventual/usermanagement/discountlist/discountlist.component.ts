import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalesInterfaceData, salesReport } from '../../data/salesReport';
import { DescuentosModel } from '../../models/descuentos.model';
import { Observable } from 'rxjs';
import { DeleteDescuento, GetDescuento } from '../../state-management/descuentos/descuento.action';
import { DiscountsState } from '../../state-management/descuentos/descuento.state';
import { Store } from '@ngxs/store';
import { PdfreportService } from '../../services/reportes/pdfreport.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { CsvreportService } from '../../services/reportes/csvreport.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PermisosAppService } from '../../services/permisos-app.service';
import { GetPermisosRol } from '../../state-management/permisos-rol/permisos-rol.action';

@Component({
  selector: 'app-discountlist',
  templateUrl: './discountlist.component.html',
  styleUrls: ['./discountlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscountlistComponent implements AfterViewInit {
  descuentos$: Observable<DescuentosModel[]>;

  displayedColumns: string[] = [
    'select', 'tipo', 'monto', 'fecha', 'justificacion',
    'action',
  ];
  dataSource: MatTableDataSource<DescuentosModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<DescuentosModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService, public permisosAppService: PermisosAppService) {
    // Assign your data array to the data source
    this.descuentos$ = this.store.select(DiscountsState.getDiscounts);
  }

  generarPDF() {
    const descuentosSeleccionados = this.selection.selected;
    this.pdfreportService.descuentopdf(descuentosSeleccionados);
  }

  generarCSV() {
    const descuentosSeleccionados = this.selection.selected;
    this.csvreportService.descuentoscsv(descuentosSeleccionados);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  eliminarDescuento(id: number) {
    this.store.dispatch(new DeleteDescuento(id)).subscribe({
      next: () => {
        console.log('Descuento eliminada exitosamente');
        this.openSnackBar('Descuento eliminado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al eliminada Descuento:', error);
        this.openSnackBar('Descuento no se pudo eliminar', 'Cerrar');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
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
  checkboxLabel(row?: DescuentosModel): string {
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

  ngOnInit(): void {
    // Despacha la acción para obtener los usuarios
    this.store.dispatch([new GetDescuento(), new GetPermisosRol()]);

    // Suscríbete al observable para actualizar el dataSource
    this.descuentos$.subscribe((descuentos) => {
      this.dataSource.data = descuentos; // Asigna los datos al dataSource
    });
  }
}
