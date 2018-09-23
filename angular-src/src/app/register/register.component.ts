import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service'

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


  constructor(private validateService: ValidateService) { }

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
  }
}
