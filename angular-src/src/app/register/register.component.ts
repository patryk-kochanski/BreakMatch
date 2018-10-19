import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string;
  username: string;
  email: string;
  password: string;


  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router : Router
    ) { }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateRegister(user)){
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      return false;
    }

    this.authService.registerUser(user).subscribe( (data) => {
      console.log(data);
      // console.log(data._body.success);
      //   if(data.success === true)
      //     this.router.navigate(['/login']);
      //   else
      //     console.log("Something went wrong.")
    });
  }
}
