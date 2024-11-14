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
import { RolModel } from '../../models/rol.model';
import { AddRol, DeleteRol, GetRol, UpdateRol } from '../../state-management/rol/rol.action';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { PdfreportService } from '../../services/reportes/pdfreport.service';
import { RolesState } from '../../state-management/rol/rol.state';
import { CsvreportService } from '../../services/reportes/csvreport.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsService } from '../../services/dialogs/dialogs.service';

@Component({
  selector: 'app-createrole',
  templateUrl: './createrole.component.html',
  styleUrls: ['./createrole.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateroleComponent implements AfterViewInit {
  rol: RolModel = {
    id: 0,
    nombre: ''
  };
  
  agregarRol() {
    this.store.dispatch(new AddRol(this.rol)).subscribe({
      next: (response) => {
        console.log('Rol agregar exitosamente');
        this.openSnackBar('Rol agregado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al agregar Rol:', error);
        this.openSnackBar('Rol no se pudo agregar', 'Cerrar');
      }
    });
  }
  
  eliminarRol(id: number) {
    this.store.dispatch(new DeleteRol(id));
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }

  
  actualizarRol(rol: RolModel) {    
    this.store.dispatch(new UpdateRol(this.rol));
  }
  
  roles$: Observable<RolModel[]>;
  //sidebar menu activation start
  menuSidebarActive: boolean = false;
  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive;
  }
  //sidebar menu activation end
  
  displayedColumns: string[] = ['select', 'rol','action'];
  dataSource: MatTableDataSource<RolModel> = new MatTableDataSource(); 
  selection = new SelectionModel<RolModel>(true, []);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(private store: Store, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService, public pdfreportService: PdfreportService) {
    this.roles$ = this.store.select(RolesState.getRoles);
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  generarPDF() {
    const rolesSeleccionados = this.selection.selected;
    this.pdfreportService.rolespdf(rolesSeleccionados);
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
    this.store.dispatch(new GetRol());
  
    // Suscríbete al observable para actualizar el dataSource
    this.roles$.subscribe((roles) => {
      this.dataSource.data = roles; // Asigna los datos al dataSource
    });
  }
  
}
