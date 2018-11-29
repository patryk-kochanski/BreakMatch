import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { MatchService } from '../services/match.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentsComponent implements OnInit {

  tournaments: any;

  constructor(
    private tournamentService: TournamentService,
    private router: Router
    ) { }

  ngOnInit() {
    this.tournamentService.getTournaments().subscribe((tournaments:any)=>{
      this.tournaments = tournaments;
    });
  }
  onClicked(match: any) {
    this.router.navigate(['/tournament/' + match._id]);
  }
}
