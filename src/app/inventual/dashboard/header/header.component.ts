import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RolModel } from '../../models/rol.model';
import { RolesState } from '../../state-management/rol/rol.state';
import { get } from 'http';
import { GetEmpleado } from '../../state-management/empleado/empleado.action';
import { GetRol } from '../../state-management/rol/rol.action';
import { GetSucursal } from '../../state-management/sucursal/sucursal.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  roles$: Observable<RolModel[]>;
  roles: RolModel[] = [];
  nombreCompleto = localStorage.getItem('nombre') + ' ' + localStorage.getItem('primerApellido');
  rol = localStorage.getItem('rol');
//short menu activation start
menuShortcutActive:boolean=false;

// Función para obtener el nombre del rol por ID
getRolName(ids: string): string {
  const id = Number(ids);
  if (!this.roles.length) {
    return 'Cargando...'; // Si los roles aún no se han cargado
  }
  const rol = this.roles.find((r) => r.id === id);
  return rol ? rol.nombre : 'Sin Rol';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
}
shortmenu(){
  if(this.menuShortcutActive==false){
    this.menuShortcutActive=true;
    this.emailShortcutActive=false;
    this.notifyShortcutActive=false;  
    this.langShortcutActive=false;
    this.proShortcutActive=false;
  }
  else {
    this.menuShortcutActive=false;
  }
}
//short menu activation end

//short menu activation start
notifyShortcutActive:boolean=false;
notifydropdown(){
  if(this.notifyShortcutActive==false){
    this.menuShortcutActive=false;
    this.emailShortcutActive=false;
    this.notifyShortcutActive=true;
    this.langShortcutActive=false;
    this.proShortcutActive=false;
  }
  else {
    this.notifyShortcutActive=false;
  }
}
//short menu activation end

//short menu activation start
emailShortcutActive:boolean=false;
emaildropdown(){
  if(this.emailShortcutActive==false){
    this.menuShortcutActive=false;
    this.emailShortcutActive=true;
    this.notifyShortcutActive=false;
    this.langShortcutActive=false;
    this.proShortcutActive=false;
  }
  else {
    this.emailShortcutActive=false;

  }
}
//short menu activation end

//short menu activation start
langShortcutActive:boolean=false;
langdropdown(){
  if(this.langShortcutActive==false){
    this.menuShortcutActive=false;
    this.emailShortcutActive=false;
    this.notifyShortcutActive=false;
    this.langShortcutActive=true;
    this.proShortcutActive=false;
  }
  else {
    this.langShortcutActive=false;

  }
}
//short menu activation end

//short menu activation start
proShortcutActive:boolean=false;
prodropdown(){
  if(this.proShortcutActive==false){
    this.menuShortcutActive=false;
    this.emailShortcutActive=false;
    this.notifyShortcutActive=false;
    this.langShortcutActive=false;
    this.proShortcutActive=true;
  }
  else {
    this.proShortcutActive=false;

  }
}
//short menu activation end

  constructor(private store: Store) {
    this.roles$ = this.store.select(RolesState.getRoles); 
  }

  ngOnInit(): void {
    this.store.dispatch([new GetEmpleado(), new GetRol(), new GetSucursal()]);

    this.roles$.subscribe((roles) => {
      this.roles = roles;
    });
  }
}
