import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.css']
})
export class TournamentComponent implements OnInit {

  tournament: any;
  canEdit: boolean = false;
  editMode: boolean = false;
  canJoin: boolean = false;

  constructor(
    private matchService: MatchService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private tournamentService: TournamentService
  ) { }

  ngOnInit() {
      let tournamentId = this.activatedRoute.params.subscribe( params => {
        const id: string = params['id'];
        this.tournamentService.getTournament(id).subscribe( (tournament:any) => {
          this.tournament = tournament;
          
        if(tournament.owner == this.authService.getLoggedUser()){
          this.canEdit = true;
        }

        if(((tournament.playerOne == undefined || tournament.playerTwo == undefined) && (tournament.matchOneWinner == undefined)) || ((tournament.playerThree == undefined || tournament.playerFour == undefined) && tournament.matchTwoWinner == undefined)){
          if( this.authService.getLoggedUser() != tournament.playerOne &&
              this.authService.getLoggedUser() != tournament.playerTwo &&
              this.authService.getLoggedUser() != tournament.playerThree &&
              this.authService.getLoggedUser() != tournament.playerFour )
              {
                this.canJoin = true;
              }
        }
        })
      })


  }

  joinMatchOne() {
    if(this.canJoin===true)
    {
      if(this.tournament.playerOne == undefined)
      {
        this.tournament.playerOne = this.authService.getLoggedUser();
      } else {
        this.tournament.playerTwo = this.authService.getLoggedUser();
      }
      this.tournamentService.editTournament(this.tournament).subscribe();
      this.canJoin = false;
    }
  }

  joinMatchTwo() {
    if(this.canJoin===true)
    {
      if(this.tournament.playerThree == undefined)
      {
        this.tournament.playerThree = this.authService.getLoggedUser();
      } else {
        this.tournament.playerFour = this.authService.getLoggedUser();
      }
      this.tournamentService.editTournament(this.tournament).subscribe();
      this.canJoin = false;
    }
  }

  editTournament() {
    this.editMode = true;
  }

  onTournamentSubmit() {
    this.tournamentService.editTournament(this.tournament).subscribe();
    this.editMode = false;
  }
}
