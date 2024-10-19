import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalesInterfaceData, salesReport } from '../../data/salesReport';
import { BonosModel } from '../../models/bonos.model';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { PdfreportService } from '../../services/reportes/pdfreport.service';
import { Store } from '@ngxs/store';
import { BonosState } from '../../state-management/bono/bono.state';
import { GetBono } from '../../state-management/bono/bono.action';

@Component({
  selector: 'app-bonuslist',
  templateUrl: './bonuslist.component.html',
  styleUrls: ['./bonuslist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BonuslistComponent implements AfterViewInit {
  bonos$: Observable<BonosModel[]>;

  displayedColumns: string[] = [
    'select', 'nombre', 'monto',
    'action',
  ];
  dataSource: MatTableDataSource<BonosModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<BonosModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService) {
    // Assign your data array to the data source
    this.bonos$ = this.store.select(BonosState.getBonos);
  }

  generarPDF() {
    const bonosSeleccionados = this.selection.selected;
    this.pdfreportService.bonospdf(bonosSeleccionados);
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
  checkboxLabel(row?: BonosModel): string {
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
    this.store.dispatch([new GetBono()]);

    // Suscríbete al observable para actualizar el dataSource
    this.bonos$.subscribe((bonos) => {
      this.dataSource.data = bonos; // Asigna los datos al dataSource
    });
  }
}
