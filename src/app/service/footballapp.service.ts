import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FootballappService {
  constructor(public http: HttpClient) {}
  header = new HttpHeaders();

  getCountries(fn: string) {
    return this.http.get(`${environment.API_HOST_URL}/` + fn);
  }

  getLeaguesId(
    countryCode: string,
    season: number,
    leagueName: string,
    countryName: string
  ) {
    const params = new HttpParams()
      .set('code', countryCode)
      .set('season', season)
      .set('name', leagueName)
      .set('country', countryName);
    return this.http.get(`${environment.API_HOST_URL}/leagues`, {
      params: params,
    });
  }

  getStandings(leagueId: number, season: number) {
    const params = new HttpParams()
      .set('league', leagueId)
      .set('season', season);
    return this.http.get(`${environment.API_HOST_URL}/standings`, {
      params: params,
    });
  }

  getfixtures(leagueId: number, teamId: number) {
    const params = new HttpParams()
      .set('league', leagueId)
      .set('last', '10')
      .set('team', teamId);
    return this.http.get(`${environment.API_HOST_URL}/fixtures`, {
      params: params,
    });
  }

  showActiveClass() {
    if (localStorage.getItem('selectedCountry')) {
      var countryData = JSON.parse(
        localStorage.getItem('selectedCountry') || '{}'
      );
    } else {
      countryData = {
        name: 'England',
        code: 'GB',
        flag: 'https://media-4.api-sports.io/flags/gb.svg',
      };
    }
    return countryData;
  }
}
