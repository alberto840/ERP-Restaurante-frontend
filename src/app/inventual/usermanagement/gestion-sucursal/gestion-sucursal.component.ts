import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SucursalModel } from '../../models/sucursal.model';
import { AddSucursal, DeleteSucursal, GetSucursal, UpdateSucursal } from '../../state-management/sucursal/sucursal.action';
import { SucursalState } from '../../state-management/sucursal/sucursal.state';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PdfreportService } from '../../services/reportes/pdfreport.service';

@Component({
  selector: 'app-gestion-sucursal',
  templateUrl: './gestion-sucursal.component.html',
  styleUrls: ['./gestion-sucursal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GestionSucursalComponent implements AfterViewInit {
  sucursal: SucursalModel = {
    id: 0,
    nombre: '',
    direccion: ''
  };
  
  agregarSucursal() {
    this.store.dispatch(new AddSucursal(this.sucursal));
    this.sucursal = {
      id: 0,
      nombre: '',
      direccion: ''
    };
  }
  
  eliminarSucursal(id: number) {
    this.store.dispatch(new DeleteSucursal(id));
  }
  
  actualizarSucursal(sucursal: SucursalModel) {    
    this.store.dispatch(new UpdateSucursal(this.sucursal));
  }
  
  sucursales$: Observable<SucursalModel[]>;
  //sidebar menu activation start
  menuSidebarActive: boolean = false;
  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive;
  }
  //sidebar menu activation end
  
  displayedColumns: string[] = ['select', 'nombre', 'direccion','accion'];
  dataSource: MatTableDataSource<SucursalModel> = new MatTableDataSource(); 
  selection = new SelectionModel<SucursalModel>(true, []);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(private store: Store, public pdfreportService: PdfreportService) {
    this.sucursales$ = this.store.select(SucursalState.getSucursales);
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  generarPDF() {
    const sucursalesSeleccionados = this.selection.selected;
    this.pdfreportService.sucursalpdf(sucursalesSeleccionados);
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
    this.store.dispatch(new GetSucursal());
  
    // Suscríbete al observable para actualizar el dataSource
    this.sucursales$.subscribe((sucursales) => {
      this.dataSource.data = sucursales; // Asigna los datos al dataSource
    });
  }
  
}
