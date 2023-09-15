import { Component, OnInit } from '@angular/core';
import { TopLeagues } from '../constant';
import { FootballappService } from '../service/footballapp.service';
import { countries } from '../interface/countryData';
import { Router } from '@angular/router';
import { Standings } from '../interface/standings';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  countriesList: countries[] = [];
  leagueId = 0;
  error: string = '';
  currentSeason = new Date().getFullYear();
  standings: Standings[] = [];
  selectedCountry: any;
  constructor(
    private footballDataService: FootballappService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('countries') || '[]').length > 0) {
      this.countriesList = JSON.parse(
        localStorage.getItem('countries') || '{}'
      );
      this.selectedCountry = this.footballDataService.showActiveClass();
      this.getLeague(this.selectedCountry);
    } else {
      this.footballDataService
        .getCountries('countries')
        .subscribe((res: any) => {
          if (res['response'].length > 0) {
            this.countriesList = res['response'].filter(
              (country: countries) => {
                return Object.keys(TopLeagues).indexOf(country.name) !== -1;
              }
            );
            this.getLeague(this.selectedCountry);
            localStorage.setItem(
              'countries',
              JSON.stringify(this.countriesList)
            );
          } else {
            this.error = res['errors']?.requests;
          }
        });
    }
  }

  getLeague(country: countries) {
    this.error = '';
    this.selectedCountry = this.footballDataService.showActiveClass();
    this.selectedCountry = country;
    localStorage.setItem('selectedCountry', JSON.stringify(country));
    let leagueName = TopLeagues[country.name as keyof typeof TopLeagues];

    this.footballDataService
      .getLeaguesId(country.code, this.currentSeason, leagueName, country.name)
      .subscribe((res: any) => {
        if (res.length > 0) {
          localStorage.setItem('leagueData', JSON.stringify(res['response']));
          localStorage.setItem('leagueId', res['response'][0].league.id);
          this.leagueId = res['response'][0].league.id;
          this.getStandings(this.leagueId);
        } else {
          this.error = res['errors']?.requests;
          window.localStorage.removeItem('standings');
        }
      });
  }
  getStandings(leagueId: number) {
    this.footballDataService
      .getStandings(leagueId, this.currentSeason)
      .subscribe((data: any) => {
        if (data['response'].length > 0) {
          this.standings = data['response'][0]?.league.standings[0];
          window.localStorage.setItem(
            'standings',
            JSON.stringify(data['response'][0].league.standings[0])
          );
        }
        this.router.navigate(['standings/' + leagueId]);
      });
  }

  ngDoCheck() {
    this.selectedCountry = this.footballDataService.showActiveClass();
  }
}
