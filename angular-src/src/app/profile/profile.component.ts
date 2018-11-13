import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  ownedMatches: any;
  participations = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private matchService: MatchService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile: any) => {
      this.user = profile.user;
      this.getOwnedMatches();
      this.getParticipations();
    },
    err => {
      console.log(err);
      return false;
    }
    );

  }

  getOwnedMatches() {
    this.matchService.getEvents({owner: this.user.username}).subscribe((ownedEvents:any) => {
      this.ownedMatches = ownedEvents;
    })
  }

  getParticipations() {
    this.matchService.getEvents({playerOne: this.user.username, playerTwo: this.user.username}).subscribe((participations:any) => {
      this.participations = participations;
    })
  }

  createMatch() {
    this.router.navigate(['/matches/create'])
  }

  onClicked(match: any) {
    this.router.navigate(['/match/' + match._id]);
  }
}
