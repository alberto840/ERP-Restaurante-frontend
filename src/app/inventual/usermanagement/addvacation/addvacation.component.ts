import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-addvacation',
  templateUrl: './addvacation.component.html',
  styleUrls: ['./addvacation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddvacationComponent implements OnInit {
  checked = false;
  disabled = false;

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

hide = true;

  constructor() { }

  ngOnInit(): void {}

}