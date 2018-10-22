import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './profile/profile.component'

const appRoutes: Routes = [
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ 
    ValidateService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
