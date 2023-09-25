import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { countries } from '../interface/countryData';
import { leagueData } from '../interface/leagueData';
import { LeagueStandings } from '../interface/standings';
import { fixture } from '../interface/fixtureData';
@Injectable({
  providedIn: 'root',
})
export class FootballappService {
  constructor(public http: HttpClient) {}
  header = new HttpHeaders();
  getCountries(fn: string): Observable<countries> {
    return this.http.get<countries>(`${environment.API_HOST_URL}/` + fn);
  }

  getLeaguesId(
    countryCode: string,
    season: number,
    leagueName: string,
    countryName: string
  ): Observable<leagueData> {
    const params = new HttpParams()
      .set('code', countryCode)
      .set('season', season)
      .set('name', leagueName)
      .set('country', countryName);
    return this.http.get<leagueData>(`${environment.API_HOST_URL}/leagues`, {
      params: params,
    });
  }

  getStandings(leagueId: number, season: number): Observable<LeagueStandings> {
    const params = new HttpParams()
      .set('league', leagueId)
      .set('season', season);
    return this.http.get<LeagueStandings>(
      `${environment.API_HOST_URL}/standings`,
      {
        params: params,
      }
    );
  }

  getfixtures(leagueId: string, teamId: string): Observable<fixture> {
    const params = new HttpParams()
      .set('league', leagueId)
      .set('last', '10')
      .set('team', teamId);
    return this.http.get<fixture>(`${environment.API_HOST_URL}/fixtures`, {
      params: params,
    });
  }
}
