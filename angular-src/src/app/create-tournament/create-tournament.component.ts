import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentService } from '../services/tournament.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent implements OnInit {

  tournamentName: string;
  game: string;
  owner: string;

  matchOneDate: Date;
  playerOne: string;
  playerTwo: string;
  matchOneWinner: string;
  
  matchTwoDate: Date;
  playerThree: string;
  playerFour: string;
  matchTwoWinner: string;

  finalMatchDate: Date;
  finalistOne: string;
  finalistTwo: string;
  tournamentWinner: string;

  constructor(
    private router: Router,
    private tournamentService: TournamentService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onTournamentSubmit(){
    const tournament = {
      name: this.tournamentName,
      game: this.game,
      owner: this.authService.getLoggedUser,

      matchOneDate: this.matchOneDate,
      playerOne: this.playerOne,
      playerTwo: this.playerTwo,
      matchOneWinner: this.matchOneWinner,
      
      matchTwoDate: this.matchTwoDate,
      playerThree: this.playerThree,
      playerFour: this.playerFour,
      matchTwoWinner: this.matchTwoWinner,
    
      finalMatchDate: this.finalMatchDate,
      finalistOne: this.finalistOne,
      finalistTwo: this.finalistTwo,
      tournamentWinner: this.tournamentWinner
    }
    console.log(tournament);
    this.tournamentService.createTournament(tournament).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['tournament/' + data.tournamentId]);
    })

  }
}
