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
        
        if(match.playerOne == undefined || match.playerTwo == undefined){
          this.canJoin = true;
        }
        if(match.owner === this.authService.getLoggedUser()){
          this.canEdit = true;
        }
      })
    });
  }

}
