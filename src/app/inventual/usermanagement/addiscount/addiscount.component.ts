import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-addiscount',
  templateUrl: './addiscount.component.html',
  styleUrls: ['./addiscount.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddiscountComponent implements OnInit {
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
