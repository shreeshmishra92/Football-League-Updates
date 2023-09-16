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
  selectedCountry='';
  constructor(
    private footballDataService: FootballappService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('countries') || '[]').length > 0) {
      this.countriesList = JSON.parse(
        localStorage.getItem('countries') || '{}'
      );
      this.selectedCountry = JSON.parse(JSON.stringify(this.footballDataService.showActiveClass())).name;
      let countryData=JSON.parse(JSON.stringify(this.footballDataService.showActiveClass()));
      this.getLeague(countryData);
    } else {
      this.footballDataService
        .getCountries('countries')
        .subscribe(res => {
          let data=JSON.parse(JSON.stringify(res))
          if (data['response'].length > 0) {
            this.countriesList = data['response'].filter(
              (country: countries) => {
                return Object.keys(TopLeagues).indexOf(country.name) !== -1;
              }
            );
            let countryData= JSON.parse(JSON.stringify(this.footballDataService.showActiveClass()));
            
            this.getLeague(countryData);
            localStorage.setItem(
              'countries',
              JSON.stringify(this.countriesList)
            );
          } 
        });
    }
  }

  getLeague(country: countries) {
    this.error = '';
    this.selectedCountry = country.name;
    localStorage.setItem('selectedCountry', JSON.stringify(country));
    let leagueName = TopLeagues[country.name as keyof typeof TopLeagues];

    this.footballDataService
      .getLeaguesId(country.code, this.currentSeason, leagueName, country.name)
      .subscribe(res => {
        let data=JSON.parse(JSON.stringify(res))
        if (data['response'].length > 0) {
          localStorage.setItem('leagueData', JSON.stringify(data['response']));
          localStorage.setItem('leagueId', data['response'][0].league.id);
          this.leagueId = data['response'][0].league.id;
          this.getStandings(this.leagueId);
        } else {
          this.error = data['errors']?.requests;
        }
      });
  }
  getStandings(leagueId: number) {
    this.footballDataService
      .getStandings(leagueId, this.currentSeason)
      .subscribe(res => {
        let data=JSON.parse(JSON.stringify(res))
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

}
