import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: Http) { }

  createTournament(tournament) {
   
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8081/tournaments/create', tournament, {headers: headers}).pipe(map((res: Response) => res.json()));
  }

  editTournament(tournament) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8081/tournaments/' + tournament._id + '/edit', tournament, {headers: headers}).pipe(map((res: Response) => res.json()));
  }

  getTournaments() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8081/tournaments', {headers: headers}).pipe(map((res: Response) => res.json()));
  }

  getTournament(id: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8081/tournaments/'+ id, {headers: headers}).pipe(map((res: Response) => res.json()));
  }

  getEvents (user:any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8081/tournaments/events', user, {headers: headers}).pipe(map((res: Response) => res.json()));
  }
}