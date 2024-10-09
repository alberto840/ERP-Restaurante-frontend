import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginModel } from '../../models/empleado.model';
import { EmpleadoService } from '../../services/empleado.service';
import { JwtdecoderService } from '../../services/jwtdecoder.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  // Variables
  tokendecoded: any;
  loginUser: LoginModel = {
    correo: '',
    password: ''
  };
  hide = true;
  // Constructor
  constructor(private userService: EmpleadoService, private jwdecoder: JwtdecoderService) { }

  ngOnInit(): void {
  }
  iniciarSesion(){
    //Decodifica el token y guarda los datos en el local storage
    this.userService.login(this.loginUser).subscribe((response) => {
      this.tokendecoded = this.jwdecoder.decodeToken(response.data);
      this.guardarDatos(response.data, this.tokendecoded.userId, this.tokendecoded.roleId, this.tokendecoded.sub);
    });
  }
  guardarDatos(token: string, userid: number, rolid: number, correo: string){
    // Guarda los datos en el local storage, los Id se convierten a string, debes convertirlos a number al recuperarlos
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', userid.toString());
    localStorage.setItem('rol', rolid.toString());
    localStorage.setItem('correo', correo);
  }

}
