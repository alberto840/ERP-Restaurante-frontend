import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BonosModel } from '../../models/bonos.model';
import { Observable } from 'rxjs';
import { AddBono } from '../../state-management/bono/bono.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-addbonus',
  templateUrl: './addbonus.component.html',
  styleUrls: ['./addbonus.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddbonusComponent implements OnInit {
  checked = false;
  disabled = false;
  
  bono: BonosModel = {
    id: 0,
    nombre: '',
    monto: 0
  };

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

  agregarBono() {
    this.store.dispatch(new AddBono(this.bono));
    this.bono = {
      id: 0,
      nombre: '',
      monto: 0
    };
  }

  //sidebar menu activation end
  
  hide = true;
  
    constructor(private store: Store) {
    }
  
    ngOnInit(): void {
    }
  
}