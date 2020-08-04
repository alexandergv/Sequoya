import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authservice: AuthService) { }
  public email: string = '';
  public pass: string = '';
  
  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  ngOnInit(): void {
  }

  onAddUser(form){
    this.authservice.registerUser(form.email, form.password)
    .then(res => {
      console.log(res);
      this.router.navigate(['/']);
     }, err => {
       console.log(err);
     }  
    )
  }

}
