import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserInterfaceData, userData } from '../../data/userData';
import { UsuarioModel } from '../../models/empleado.model';
import { Observable } from 'rxjs';
import { HorarioModel, TurnoModel } from '../../models/horarios.model';
import { ContratoModel } from '../../models/contrato.model';
import { PdfreportService } from '../../services/reportes/pdfreport.service';
import { Store } from '@ngxs/store';
import { HorarioState } from '../../state-management/horario/horario.state';
import { EmpleadosState } from '../../state-management/empleado/empleado.state';
import { TurnoState } from '../../state-management/turno/turno.state';
import { ContratoState } from '../../state-management/contrato/contrato.state';
import { GetEmpleado } from '../../state-management/empleado/empleado.action';
import { GetTurno } from '../../state-management/turno/turno.action';
import { GetHorario } from '../../state-management/horario/horario.action';

@Component({
  selector: 'app-schedulelist',
  templateUrl: './schedulelist.component.html',
  styleUrls: ['./schedulelist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulelistComponent implements AfterViewInit {
  usuarios$: Observable<UsuarioModel[]>;
  horarios$: Observable<HorarioModel[]>;
  horarios: HorarioModel[] = [];
  turnos$: Observable<TurnoModel[]>;
  turnos: TurnoModel[] = [];
  contrato$: Observable<ContratoModel[]>;
  contrato: ContratoModel[] = [];
  
  horarioslist: HorarioModel[] = [];
  turnoslist: TurnoModel[] = [];
  contratolist: ContratoModel[] = [];

  displayedColumns: string[] = [
    'select',
    'id',
    'nombre',
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo',
    'action',
  ];
  dataSource: MatTableDataSource<UsuarioModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<UsuarioModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService) {
    // Assign your data array to the data source
    this.usuarios$ = this.store.select(EmpleadosState.getEmpleados);
    this.horarios$ = this.store.select(HorarioState.getHorarios);
    this.turnos$ = this.store.select(TurnoState.getTurnos);
    this.contrato$ = this.store.select(ContratoState.getContratos);
  }

  generarPDF() {
    const usuariosSeleccionados = this.selection.selected;

    this.horarios$.subscribe((horarios: HorarioModel[]) => {
      this.horarioslist = horarios;
    });
    this.turnos$.subscribe((turnos: TurnoModel[]) => {
      this.turnoslist = turnos;
    });
    this.contrato$.subscribe((contratos: ContratoModel[]) => {
      this.contratolist = contratos;
    });
    //this.pdfreportService.userpdf(usuariosSeleccionados, this.roleslist, this.sucursaleslist);
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
  getTurnos(id: number): TurnoModel[] {
    if (!this.turnos.length) {
      return []; // Si los sucursal aún no se han cargado
    }
    let turnosUser: TurnoModel[] = [];
    for(let i = 0; i < this.horarios.length; i++) {
      if(this.horarios[i].usuariosId === id) {
        turnosUser.push(this.turnos.find((t) => t.id === this.horarios[i].turnoId) || {id: 0, nombre: '', descripcion: '', horaInicio: new Date(), horaFin: new Date(), dia: ''});
      }
    }
    return turnosUser;
  }  

  // Función para obtener el nombre del sucursal por ID
  getDia(id: number, dia: string): TurnoModel {
    let turno: TurnoModel = {
      id: 0,
      nombre: '',
      descripcion: '',
      horaInicio: new Date(),
      horaFin: new Date(),
      dia: ''
    };
    if (!this.getTurnos(id).length) {
      return turno; // Si los sucursal aún no se han cargado
    }
    switch (dia) {
      case 'Lunes':
        return this.getTurnos(id).find((t) => t.dia === 'Lunes') || turno;
        break;
      case 'Martes':
        return this.getTurnos(id).find((t) => t.dia === 'Martes') || turno;
        break;
      case 'Miercoles':
        return this.getTurnos(id).find((t) => t.dia === 'Miercoles') || turno;
        break;
      case 'Jueves':
        return this.getTurnos(id).find((t) => t.dia === 'Jueves') || turno;
        break;
      case 'Viernes':
        return this.getTurnos(id).find((t) => t.dia === 'Viernes') || turno;
        break;
      case 'Sabado':
        return this.getTurnos(id).find((t) => t.dia === 'Sabado') || turno;
        break;
      case 'Domingo':
        return this.getTurnos(id).find((t) => t.dia === 'Domingo') || turno;
        break;
      default:
        return turno; // Return default turno if no match is found
    }
  }

  ngOnInit(): void {
    // Despacha la acción para obtener los usuarios
    this.store.dispatch([new GetEmpleado(), new GetTurno(), new GetHorario()]);

    // Suscríbete al observable para actualizar el dataSource
    this.usuarios$.subscribe((users) => {
      this.dataSource.data = users; // Asigna los datos al dataSource
    });

    this.turnos$.subscribe((turnos) => {
      this.turnos = turnos;
    });

    this.horarios$.subscribe((horarios) => {
      this.horarios = horarios;
    });
  }
}
