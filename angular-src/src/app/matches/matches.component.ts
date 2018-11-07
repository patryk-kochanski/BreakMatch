import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matches: any;

  constructor(
    private matchService: MatchService,
    private router: Router
    ) { }

  ngOnInit() {
    this.matchService.getMatches().subscribe((matches:any)=>{
      this.matches = matches;
    });
  }
  onClicked(match: any) {
    this.router.navigate(['/match/' + match._id]);
  }
}
