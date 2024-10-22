import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ContratoModel } from '../../models/contrato.model';
import { AddContrato, DeleteContrato, GetContrato, UpdateContrato } from '../../state-management/contrato/contrato.action';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { PdfreportService } from '../../services/reportes/pdfreport.service';
import { MatSort } from '@angular/material/sort';
import { ContratoState } from '../../state-management/contrato/contrato.state';
import { UsuarioModel } from '../../models/empleado.model';
import { EmpleadosState } from '../../state-management/empleado/empleado.state';
import { GetEmpleado } from '../../state-management/empleado/empleado.action';
import { SucursalModel } from '../../models/sucursal.model';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements AfterViewInit {
  usuarios$: Observable<UsuarioModel[]>;
  usuarios: UsuarioModel[] = [];
  contrato: ContratoModel = {
    id: 0,
    fechaInicio: new Date(),
    fechaConclusion: new Date(),
    fechaContrato: new Date(),
    identificador: 0,
    usuariosId: 0
  };
  
  agregarContrato() {
    this.store.dispatch(new AddContrato(this.contrato));
    this.contrato = {
      id: 0,
      fechaInicio: new Date(),
      fechaConclusion: new Date(),
      fechaContrato: new Date(),
      identificador: 0,
      usuariosId: 0
    };
  }
  
  eliminarContrato(id: number) {
    this.store.dispatch(new DeleteContrato(id));
  }
  
  actualizarContrato(contrato: ContratoModel) {    
    this.store.dispatch(new UpdateContrato(this.contrato));
  }

  getUsuariosName(id: number) {
    if (!this.usuarios.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const usuario = this.usuarios.find((r) => r.id === id);
    return usuario ? (usuario.nombre+" "+usuario.primerApellido+" "+usuario.segundoApellido) : 'Sin usuario';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }
  
  contratos$: Observable<ContratoModel[]>;
  //sidebar menu activation start
  menuSidebarActive: boolean = false;
  myfunction() {
    this.menuSidebarActive = !this.menuSidebarActive;
  }
  //sidebar menu activation end
  
  displayedColumns: string[] = ['select', 'nombre', 'inicio','final', 'fechaContrato', 'identificador', 'acciones'];
  dataSource: MatTableDataSource<ContratoModel> = new MatTableDataSource(); 
  selection = new SelectionModel<ContratoModel>(true, []);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(private store: Store, public pdfreportService: PdfreportService) {
    this.contratos$ = this.store.select(ContratoState.getContratos);
    this.usuarios$ = this.store.select(EmpleadosState.getEmpleados);
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  generarPDF() {
    const contratosSeleccionados = this.selection.selected;
    const usuarios = this.usuarios$; // Aquí debes asegurarte de que tienes los roles correctamente cargados
  
    // Suscribirse a los roles para obtener la lista y generar el PDF
    usuarios.subscribe((usuarioslist: UsuarioModel[]) => {
      this.pdfreportService.contratopdf(contratosSeleccionados, usuarioslist);
    });
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
    this.store.dispatch([new GetContrato(), new GetEmpleado()]);
  
    // Suscríbete al observable para actualizar el dataSource
    this.contratos$.subscribe((contratos) => {
      this.dataSource.data = contratos; // Asigna los datos al dataSource
    });

    this.usuarios$.subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }
  
}

