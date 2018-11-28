import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  match: any;
  canJoin: boolean = false;
  canEdit: boolean = false;
  editMode:boolean = false;

  constructor(
    private matchService: MatchService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    let matchId = this.activatedRoute.params.subscribe( params => {
      const id: string = params['id'];

      this.matchService.getMatch(id).subscribe( (match: any) => {
        this.match = match;
        console.log(this.match);
        if(match.playerOne != undefined || match.playerTwo != undefined){
          if(match.playerOne != this.authService.getLoggedUser() && match.playerTwo != this.authService.getLoggedUser()){
            this.canJoin = true;
          }
        }

        if(match.owner == this.authService.getLoggedUser()){
          this.canEdit = true;
        }
      })
    });
  }

  joinMatch() {
    if(this.canJoin===true)
    {
      if(this.match.playerOne == undefined)
      {
        this.match.playerOne = this.authService.getLoggedUser();
      } else {
        this.match.playerTwo = this.authService.getLoggedUser();
      }
      this.matchService.editMatch(this.match).subscribe();
      this.canJoin = false;
    }
  }

  editMatch() {
    this.editMode = true;
  }

  onSubmit() {
    this.matchService.editMatch(this.match).subscribe();
    this.editMode = false;
  }

}
