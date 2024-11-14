import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { PermisoModel, RolModel } from '../../models/rol.model';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { CsvreportService } from '../../services/reportes/csvreport.service';
import { PdfreportService } from '../../services/reportes/pdfreport.service';
import { RolesState } from '../../state-management/rol/rol.state';
import { GetRol } from '../../state-management/rol/rol.action';
import { GetPermisosRol, UpdatePermisosRol } from '../../state-management/permisos-rol/permisos-rol.action';
import { PermisoRolState } from '../../state-management/permisos-rol/permisos-rol.state';

//for checkbox
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

export interface ids {
  id: number;
  state: boolean;
}

@Component({
  selector: 'app-rolepermission',
  templateUrl: './rolepermission.component.html',
  styleUrls: ['./rolepermission.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RolepermissionComponent implements OnInit {
  permisosRoles$: Observable<PermisoModel[]>;
  idpermisos: ids[] = [
    {id: 1, state: false},
    {id: 2, state: false},
    {id: 3, state: false},
    {id: 4, state: false},
    {id: 5, state: false},
    {id: 6, state: false},
    {id: 7, state: false},
    {id: 8, state: false},
    {id: 9, state: false},
    {id: 10, state: false},
    {id: 11, state: false},
    {id: 12, state: false},
    {id: 13, state: false},
    {id: 14, state: false},
    {id: 15, state: false},
    {id: 16, state: false},
    {id: 17, state: false},
    {id: 18, state: false},
    {id: 19, state: false},
    {id: 20, state: false},
    {id: 21, state: false},
    {id: 22, state: false},
    {id: 23, state: false},
    {id: 24, state: false},
    {id: 25, state: false},
    {id: 26, state: false},
    {id: 27, state: false},
    {id: 28, state: false},
    {id: 29, state: false},
    {id: 30, state: false},
    {id: 31, state: false},
    {id: 32, state: false},
    {id: 33, state: false},
    {id: 34, state: false}
  ];
  permisosRoles: PermisoModel = {
    permisosRolesId: 0,
    rolId: 0,
    permisoId: 0,
    status: false
  }
  
  constructor(private store: Store, public pdfreportService: PdfreportService, private _snackBar: MatSnackBar, public csvreportService: CsvreportService, public dialogsService: DialogsService) {
      this.roles$ = this.store.select(RolesState.getRoles);
      this.permisosRoles$ = this.store.select(PermisoRolState.getPermisosRol);
    }
  
  roles$: Observable<RolModel[]>; // Observable que contiene los roles
//sidebar menu activation start
menuSidebarActive:boolean=false;
myfunction(){
  if(this.menuSidebarActive==false){
    this.menuSidebarActive=true;
  }
  else {
    this.menuSidebarActive=false;
  }
}
//sidebar menu activation end

//checkbox start
task: Task = {
  name: 'Permitir Todo',
  completed: false,
  color: 'primary',
  
};
isComplete : boolean = false;
allComplete: boolean = false;
oneComplete: boolean = false;
twoComplete: boolean = false;
threeComplete: boolean = false;
fourComplete: boolean = false;
fiveComplete: boolean = false;
sixComplete: boolean = false;
sevenComplete: boolean = false;
eightComplete: boolean = false;
nineComplete: boolean = false;
tenComplete: boolean = false;
elevenComplete: boolean = false;
twelveComplete: boolean = false;
thirteenComplete: boolean = false;
fourteenComplete: boolean = false;
fifteenComplete: boolean = false;
sixteenComplete: boolean = false;
seventeenComplete: boolean = false;
eighteenComplete: boolean = false;
nineteenComplete: boolean = false;
twentyComplete: boolean = false;
twentyoneComplete: boolean = false;
twentytwoComplete: boolean = false;
twentythreeComplete: boolean = false;
twentyfourComplete: boolean = false;
twentyfiveComplete: boolean = false;
twentysixComplete: boolean = false;
twentysevenComplete: boolean = false;
twentyeightComplete: boolean = false;
twentynineComplete: boolean = false;
thirtyComplete: boolean = false;
thirtyoneComplete: boolean = false;
thirtytwoComplete: boolean = false;
thirtythreeComplete: boolean = false;
thirtyfourComplete: boolean = false;

disabled_condition = true;

updateAllComplete() {
  this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
}
someComplete(): boolean {
  if (this.task.subtasks == null) {
    return false;
  }
  return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
}

setAll(completed: boolean) {
  this.isComplete = completed;
  this.allComplete = completed;
  this.idpermisos.forEach(t => t.state = completed);
  if (this.task.subtasks == null) {
    return;
  }
  this.task.subtasks.forEach(t => t.completed = completed);
  
}

filtrarPermisosPorRolId(permisos$: Observable<PermisoModel[]>, rolId: number): Observable<PermisoModel[]> {
  return permisos$.pipe(
    map((permisos) => permisos.filter((permiso) => permiso.rolId === rolId))
  );
}

actualizarPermisos(){
  if(this.permisosRoles.rolId == 0){
    this.openSnackBar('Por favor seleccione un rol', 'Cerrar');
    return;
  }
  for (const permiso of this.idpermisos) {
    this.filtrarPermisosPorRolId(this.permisosRoles$, this.permisosRoles.rolId).subscribe((permisosFiltrados) => {
      this.permisosRoles.permisosRolesId = permiso.id;
      for (const permisoporId of permisosFiltrados){
        if(permisoporId.permisoId == permiso.id){
          this.permisosRoles.permisosRolesId = permisoporId.permisosRolesId;
          this.permisosRoles.status = permiso.state;
          this.permisosRoles.permisoId = permisoporId.permisoId;
        }
      }
    });
    console.log(this.permisosRoles.permisosRolesId+" - "+this.permisosRoles.rolId+" - "+this.permisosRoles.permisoId+" - "+this.permisosRoles.status);
    this.store.dispatch(new UpdatePermisosRol(this.permisosRoles)).subscribe({
      next: () => {
        this.openSnackBar('Permisos actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error('Error al actualizar Permisos:', error);
        this.openSnackBar('No se pudo actualizar Permisos', 'Cerrar');
      }
    });
  }  
}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {duration: 2000});
}

setSingleCheck1(completed: boolean) {
  this.agregarId(1,completed);
  this.oneComplete = completed;
}
setSingleCheck2(completed: boolean) {
  this.agregarId(2,completed);
  this.twoComplete = completed;
}
setSingleCheck3(completed: boolean) {
  this.agregarId(3,completed);
  this.threeComplete = completed;
}
setSingleCheck4(completed: boolean) {
  this.agregarId(4,completed);
  this.fourComplete = completed;
}
setSingleCheck5(completed: boolean) {
  this.agregarId(5,completed);
  this.fiveComplete = completed;
}
setSingleCheck6(completed: boolean) {
  this.agregarId(6,completed);
  this.sixComplete = completed;
}

setSingleCheck7(completed: boolean) {
  this.agregarId(7,completed);
  this.sevenComplete = completed;
}
setSingleCheck8(completed: boolean) {
  this.agregarId(8,completed);
  this.eightComplete = completed;
}
setSingleCheck9(completed: boolean) {
  this.agregarId(9,completed);
  this.nineComplete = completed;
}
setSingleCheck10(completed: boolean) {
  this.agregarId(10,completed);
  this.tenComplete = completed;
}
setSingleCheck11(completed: boolean) {
  this.agregarId(11,completed);
  this.elevenComplete = completed;
}
setSingleCheck12(completed: boolean) {
  this.agregarId(12,completed);
  this.twelveComplete = completed;
}
setSingleCheck13(completed: boolean) {
  this.agregarId(13,completed);
  this.thirteenComplete = completed;
}
setSingleCheck14(completed: boolean) {
  this.agregarId(14,completed);
  this.fourteenComplete = completed;
}
setSingleCheck15(completed: boolean) {
  this.agregarId(15,completed);
  this.fifteenComplete = completed;
}

setSingleCheck16(completed: boolean) {
  this.agregarId(16,completed);
  this.sixteenComplete = completed;
}
setSingleCheck17(completed: boolean) {
  this.agregarId(17,completed);
  this.seventeenComplete = completed;
}
setSingleCheck18(completed: boolean) {
  this.agregarId(18,completed);
  this.eighteenComplete = completed;
}
setSingleCheck19(completed: boolean) {
  this.agregarId(19,completed);
  this.nineteenComplete = completed;
}
setSingleCheck20(completed: boolean) {
  this.agregarId(20,completed);
  this.twentyComplete = completed;
}
setSingleCheck21(completed: boolean) {
  this.agregarId(21,completed);
  this.twentyoneComplete = completed;
}
setSingleCheck22(completed: boolean) {
  this.agregarId(22,completed);
  this.twentytwoComplete = completed;
}
setSingleCheck23(completed: boolean) {
  this.agregarId(23,completed);
  this.twentythreeComplete = completed;
}
setSingleCheck24(completed: boolean) {
  this.agregarId(24,completed);
  this.twentyfourComplete = completed;
}
setSingleCheck25(completed: boolean) {
  this.agregarId(25,completed);
  this.twentyfiveComplete = completed;
}
setSingleCheck26(completed: boolean) {
  this.agregarId(26,completed);
  this.twentysixComplete = completed;
}
setSingleCheck27(completed: boolean) {
  this.agregarId(27,completed);
  this.twentysevenComplete = completed;
}
setSingleCheck28(completed: boolean) {
  this.agregarId(28,completed);
  this.twentyeightComplete = completed;
}
setSingleCheck29(completed: boolean) {
  this.agregarId(29,completed);
  this.twentynineComplete = completed;
}
setSingleCheck30(completed: boolean) {
  this.agregarId(30,completed);
  this.thirtyComplete = completed;
}
setSingleCheck31(completed: boolean) {
  this.agregarId(31,completed);
  this.thirtyoneComplete = completed;
}
setSingleCheck32(completed: boolean) {
  this.agregarId(32,completed);
  this.thirtytwoComplete = completed;
}
setSingleCheck33(completed: boolean) {
  this.agregarId(33,completed);
  this.thirtythreeComplete = completed;
}
setSingleCheck34(completed: boolean) {
  this.agregarId(34,completed);
  this.thirtyfourComplete = completed;
}

agregarId(id: number, completed: boolean){  
  this.idpermisos[id-1].state = completed;
}
//checkbox end

  ngOnInit(): void {
    this.store.dispatch([new GetRol(), new GetPermisosRol()]);
  }

}
