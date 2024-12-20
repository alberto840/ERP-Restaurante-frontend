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
        //const status = response.data.usuario.estado;
        //this.tokendecoded = this.jwdecoder.decodeToken(response.data);
        this.guardarDatos(response.data.token, response.data.usuario.id, response.data.usuario.nombre, response.data.usuario.primerApellido, response.data.usuario.segundoApellido, response.data.usuario.rolesId, response.data.usuario.sucursalId, response.data.usuario.correo, response.data.usuario.empCode, response.data.usuario.fechaIngreso, response.data.usuario.estado, response.data.usuario.direccion, response.data.usuario.edad, response.data.usuario.telefono);
        this.router.navigate(['salarios/lista']);
      },
      error: (error) => {
        console.error('Error Login:', error);
        alert('Hubo un error al hacer login.');
      }
    });
  }
  guardarDatos(token: string, userid: number, nombre: string, primerApellido: string, segundoApellido: string, rolid: number, sucursalid: number, correo: string, empCode: string, fechaIngreso: string, estado: boolean, direccion: string, edad: string, telefono: string){
    // Guarda los datos en el local storage, los Id se convierten a string, debes convertirlos a number al recuperarlos
    localStorage.setItem('token', token);
    localStorage.setItem('userid', userid.toString());
    localStorage.setItem('empCode', empCode);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('primerApellido', primerApellido);
    localStorage.setItem('segundoApellido', segundoApellido);
    localStorage.setItem('correo', correo);
    localStorage.setItem('fechaIngreso', fechaIngreso);
    localStorage.setItem('estado', estado.toString());
    localStorage.setItem('direccion', direccion);
    localStorage.setItem('edad', edad);
    localStorage.setItem('telefono', telefono);
    localStorage.setItem('rol', rolid.toString());
    localStorage.setItem('sucursal', sucursalid.toString());
  }
}
