import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators"
import { AuthService } from '../services/auth.service';
import { MatchService } from '../services/match.service';

interface IMatch {
    name: String;
    date: Date;
    game: String;
    playerOne;
    playerOneScore;
    playerTwo;
    playerTwoScore;
    winner;
    owner;
}
@Component({
  selector: 'app-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})
export class CreateMatchComponent implements OnInit {
  name: string;
  date: Date;
  game: string;
  playerOne: string;
  playerTwo: string;

  constructor(
    private authService: AuthService,
    private matchService: MatchService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const match = {
      name: this.name,
      date: this.date,
      game: this.game,
      playerOne: this.playerOne,
      playerTwo: this.playerTwo,
      owner: this.authService.getLoggedUser()
    }

    this.matchService.createMatch(match).subscribe((data) => {
      // console.log(data);
    });
}

}
