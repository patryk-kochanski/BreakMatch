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
import { AuthGuard } from './guards/auth.guard';
import { EventsComponent } from './events/events.component';
import { CreateMatchComponent } from './match/create-match.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchService } from './services/match.service';
import { MatchComponent } from './match/match/match.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { TournamentComponent } from './tournament/tournament.component';

const appRoutes: Routes = [
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path:'matches/create', component: CreateMatchComponent, canActivate: [AuthGuard]},
  {path:'matches', component: MatchesComponent},
  {path:'', component: MatchesComponent},
  {path:'match/:id', component: MatchComponent},
  {path:'tournament/create', component: CreateTournamentComponent, canActivate: [AuthGuard]},
  {path:'tournaments', component: TournamentsComponent},
  {path:'tournament/:id', component: TournamentComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EventsComponent,
    CreateMatchComponent,
    MatchesComponent,
    MatchComponent,
    TournamentsComponent,
    CreateTournamentComponent,
    TournamentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ 
    ValidateService,
    AuthService,
    AuthGuard,
    MatchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
