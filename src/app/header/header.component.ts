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
  selectedCountry = '';
  constructor(
    private footballDataService: FootballappService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.footballDataService.getCountries('countries').subscribe((res) => {
      let data = JSON.parse(JSON.stringify(res));

      this.countriesList = data['response'].filter((country: countries) => {
        return Object.keys(TopLeagues).indexOf(country.name) !== -1;
      });
      let countryData = JSON.parse(
        JSON.stringify(this.footballDataService.showActiveClass())
      );

      this.getLeague(countryData);
    });
  }

  getLeague(country: countries) {
    this.error = '';
    this.selectedCountry = country.name;

    let leagueName = TopLeagues[country.name as keyof typeof TopLeagues];

    this.footballDataService
      .getLeaguesId(country.code, this.currentSeason, leagueName, country.name)
      .subscribe((res) => {
        let data = JSON.parse(JSON.stringify(res));

     
        this.leagueId = data['response'][0].league.id;
        this.getStandings(this.leagueId);
      });
  }
  getStandings(leagueId: number) {
    this.footballDataService
      .getStandings(leagueId, this.currentSeason)
      .subscribe((res) => {
        let data = JSON.parse(JSON.stringify(res));

        this.standings = data['response'][0]?.league.standings[0];
    

        this.router.navigate(['standings/' + leagueId]);
      });
  }
}
