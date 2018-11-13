import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: Http) { }

  createMatch(match) {
   
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8081/matches/create', match, {headers: headers}).pipe(map((res: Response) => res.json()));
  }

  editMatch(match) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8081/matches/' + match._id + '/edit', match, {headers: headers}).pipe(map((res: Response) => res.json()));
  }

  getMatches() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8081/matches', {headers: headers}).pipe(map((res: Response) => res.json()));
  }

  getMatch(id: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8081/matches/'+ id, {headers: headers}).pipe(map((res: Response) => res.json()));
  }

  getEvents (user:any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8081/matches/events', user, {headers: headers}).pipe(map((res: Response) => res.json()));
  }
}