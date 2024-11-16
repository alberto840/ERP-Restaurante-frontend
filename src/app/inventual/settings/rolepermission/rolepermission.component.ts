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
import { time } from 'console';

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
    {id: 34, state: false},
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

setAll(completed: boolean) {
  this.allComplete = completed;
  this.oneComplete = completed;
  this.twoComplete = completed;
  this.threeComplete = completed;
  this.fourComplete = completed;
  this.fiveComplete = completed;
  this.sixComplete = completed;
  this.sevenComplete = completed;
  this.eightComplete = completed;
  this.nineComplete = completed;
  this.tenComplete = completed;
  this.elevenComplete = completed;
  this.twelveComplete = completed;
  this.thirteenComplete = completed;
  this.fourteenComplete = completed;
  this.fifteenComplete = completed;
  this.sixteenComplete = completed;
  this.seventeenComplete = completed;
  this.eighteenComplete = completed;
  this.nineteenComplete = completed;
  this.twentyComplete = completed;
  this.twentyoneComplete = completed;
  this.twentytwoComplete = completed;
  this.twentythreeComplete = completed;
  this.twentyfourComplete = completed;
  this.twentyfiveComplete = completed;
  this.twentysixComplete = completed;
  this.twentysevenComplete = completed;
  this.twentyeightComplete = completed;
  this.twentynineComplete = completed;
  this.thirtyComplete = completed;
  this.thirtyoneComplete = completed;
  this.thirtytwoComplete = completed;
  this.thirtythreeComplete = completed;
  this.thirtyfourComplete = completed;  
  for (const permiso of this.idpermisos) {
    permiso.state = completed;
  }
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

    //console.log("--"+this.permisosRoles.permisosRolesId+" - "+this.permisosRoles.rolId+" - "+this.permisosRoles.permisoId+" - "+this.permisosRoles.status);
    this.store.dispatch(new UpdatePermisosRol(this.permisosRoles)).subscribe({
      next: () => {
        this.openSnackBar('Permisos actualizado correctamente', 'Cerrar');
      },
      error: (error) => {
        console.error("--"+this.permisosRoles.permisosRolesId+" - "+this.permisosRoles.rolId+" - "+this.permisosRoles.permisoId+" - "+this.permisosRoles.status+'Error al actualizar Permisos:', error);
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

asignarPermisosRol(){
  this.store.dispatch([new GetPermisosRol()]);
  console.log(this.permisosRoles.rolId);
  this.filtrarPermisosPorRolId(this.permisosRoles$, this.permisosRoles.rolId).subscribe((permisos) => {
    for (const permiso of this.idpermisos) {
      permiso.state = permisos.find((permisoencontrado) => permisoencontrado.permisoId === permiso.id)?.status || false;
    }
    this.oneComplete = this.idpermisos.find((permiso) => permiso.id === 1)?.state || false;
    this.twoComplete = this.idpermisos.find((permiso) => permiso.id === 2)?.state || false;
    this.threeComplete = this.idpermisos.find((permiso) => permiso.id === 3)?.state || false;
    this.fourComplete = this.idpermisos.find((permiso) => permiso.id === 4)?.state || false;
    this.fiveComplete = this.idpermisos.find((permiso) => permiso.id === 5)?.state || false;
    this.sixComplete = this.idpermisos.find((permiso) => permiso.id === 6)?.state || false;
    this.sevenComplete = this.idpermisos.find((permiso) => permiso.id === 7)?.state || false;
    this.eightComplete = this.idpermisos.find((permiso) => permiso.id === 8)?.state || false;
    this.nineComplete = this.idpermisos.find((permiso) => permiso.id === 9)?.state || false;
    this.tenComplete = this.idpermisos.find((permiso) => permiso.id === 10)?.state || false;
    this.elevenComplete = this.idpermisos.find((permiso) => permiso.id === 11)?.state || false;
    this.twelveComplete = this.idpermisos.find((permiso) => permiso.id === 12)?.state || false;
    this.thirteenComplete = this.idpermisos.find((permiso) => permiso.id === 13)?.state || false;
    this.fourteenComplete = this.idpermisos.find((permiso) => permiso.id === 14)?.state || false;
    this.fifteenComplete = this.idpermisos.find((permiso) => permiso.id === 15)?.state || false;
    this.sixteenComplete = this.idpermisos.find((permiso) => permiso.id === 16)?.state || false;
    this.seventeenComplete = this.idpermisos.find((permiso) => permiso.id === 17)?.state || false;
    this.eighteenComplete = this.idpermisos.find((permiso) => permiso.id === 18)?.state || false;
    this.nineteenComplete = this.idpermisos.find((permiso) => permiso.id === 19)?.state || false;
    this.twentyComplete = this.idpermisos.find((permiso) => permiso.id === 20)?.state || false;
    this.twentyoneComplete = this.idpermisos.find((permiso) => permiso.id === 21)?.state || false;
    this.twentytwoComplete = this.idpermisos.find((permiso) => permiso.id === 22)?.state || false;
    this.twentythreeComplete = this.idpermisos.find((permiso) => permiso.id === 23)?.state || false;
    this.twentyfourComplete = this.idpermisos.find((permiso) => permiso.id === 24)?.state || false;
    this.twentyfiveComplete = this.idpermisos.find((permiso) => permiso.id === 25)?.state || false;
    this.twentysixComplete = this.idpermisos.find((permiso) => permiso.id === 26)?.state || false;
    this.twentysevenComplete = this.idpermisos.find((permiso) => permiso.id === 27)?.state || false;
    this.twentyeightComplete = this.idpermisos.find((permiso) => permiso.id === 28)?.state || false;
    this.twentynineComplete = this.idpermisos.find((permiso) => permiso.id === 29)?.state || false;
    this.thirtyComplete = this.idpermisos.find((permiso) => permiso.id === 30)?.state || false;
    this.thirtyoneComplete = this.idpermisos.find((permiso) => permiso.id === 31)?.state || false;
    this.thirtytwoComplete = this.idpermisos.find((permiso) => permiso.id === 32)?.state || false;
    this.thirtythreeComplete = this.idpermisos.find((permiso) => permiso.id === 33)?.state || false;
    this.thirtyfourComplete = this.idpermisos.find((permiso) => permiso.id === 34)?.state || false;
    console.log(this.idpermisos);
  }).unsubscribe();

}

  ngOnInit(): void {
    this.store.dispatch([new GetRol(), new GetPermisosRol()]);
  }

}
