import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authSvc: AuthService, private route :Router) { }

  ErrorMsg: String = "";

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  
  async onLogin(form: UserI) {
    const rs = await this.authSvc.loginByEmail(form);
    switch(rs.code){
      case 'auth/wrong-password':
        this.ErrorMsg = "La contraseña es incorrecta.";
        break;
      case 'auth/invalid-email':
        this.ErrorMsg = "El email no existe.";
        break;
      default:
        this.ErrorMsg = "";
        this.route.navigate(['/']); 
        break;
    }
  }
}
