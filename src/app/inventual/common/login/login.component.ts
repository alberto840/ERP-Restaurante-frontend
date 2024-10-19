import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginModel } from '../../models/empleado.model';
import { EmpleadoService } from '../../services/empleado.service';
import { JwtdecoderService } from '../../services/jwtdecoder.service';
import { Router } from '@angular/router';

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
  constructor(private router: Router, private userService: EmpleadoService, private jwdecoder: JwtdecoderService) { }

  ngOnInit(): void {
  }
  iniciarSesion(){
    //Decodifica el token y guarda los datos en el local storage    
    this.userService.login(this.loginUser).subscribe({
      next: (response) => {
        //Con el estado se le permitirá o no el acceso a la aplicación
        const status = response.data.usuario.estado;
        //this.tokendecoded = this.jwdecoder.decodeToken(response.data);
        this.guardarDatos(response.data.token, response.data.usuario.id, response.data.usuario.nombre, response.data.usuario.primerApellido, response.data.usuario.segundoApellido, response.data.usuario.rolesId, response.data.usuario.sucursalId);
        this.router.navigate(['/salarios']);
      },
      error: (error) => {
        console.error('Error Login:', error);
        alert('Hubo un error al hacer login.');
      }
    });
  }
  guardarDatos(token: string, userid: number, nombre: string, primerApellido: string, segundoApellido: string, rolid: number, sucursalid: number){
    // Guarda los datos en el local storage, los Id se convierten a string, debes convertirlos a number al recuperarlos
    localStorage.setItem('token', token);
    localStorage.setItem('userid', userid.toString());
    localStorage.setItem('nombre', nombre);
    //localStorage.setItem('primerApellido', primerApellido);
    //localStorage.setItem('segundoApellido', segundoApellido);
    //localStorage.setItem('rol', rolid.toString());
    localStorage.setItem('sucursal', sucursalid.toString());
  }
}
