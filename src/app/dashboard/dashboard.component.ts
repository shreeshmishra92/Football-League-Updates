import { Component, OnInit } from '@angular/core';
import { FootballappService } from '../service/footballapp.service';
import { TopLeagues } from '../constant';
import { countries } from '../interface/countryData';
import { LeagueStandings } from '../interface/standings';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  countryList: countries[] = [];
  selectedCountry!: countries;
  standingsList: LeagueStandings[] = [];
  leagueId!: number;
  loading: boolean = false;
  error!: string;
  currentSeason: number = new Date().getFullYear();
  constructor(private footballService: FootballappService) {}

  ngOnInit(): void {
    let selectedCountry = JSON.parse(
      sessionStorage.getItem('SelectedCountry') || 'null'
    );
    if (selectedCountry != null) {
      this.selectedCountry = selectedCountry;
      this.getLeagues(selectedCountry);
    }
    this.getAllcountries();
  }

  getAllcountries() {
    this.loading = true;
    let countryList = JSON.parse(sessionStorage.getItem('countries') || 'null');
    if (countryList) {
      this.countryList = countryList;
    } else {
      this.footballService.getCountries('countries').subscribe(
        (res) => {
          this.countryList = res['response'].filter((country) => {
            return Object.keys(TopLeagues).indexOf(country['name']) !== -1;
          });
          sessionStorage.setItem('countries', JSON.stringify(this.countryList));
          this.getLeagues(this.countryList[0]);
        },
        (err) => {
          this.loading = false;
        }
      );
    }
  }
  
  //get league data from here
  getLeagues(country: countries) {
    this.loading = true;
    sessionStorage.setItem('SelectedCountry', JSON.stringify(country));
    this.selectedCountry = country;
    let leagueName = TopLeagues[country.name as keyof typeof TopLeagues];
    this.selectedCountry = country;
    this.footballService
      .getLeaguesId(country.code, this.currentSeason, leagueName, country.name)
      .subscribe((data) => {
        this.leagueId = data['response'][0].league.id;
        this.getLeagueStanding(this.leagueId);
      });
  }
//get Standing from here
  getLeagueStanding(leagueId: number) {
    this.footballService
      .getStandings(leagueId, this.currentSeason)
      .subscribe((data) => {
        this.standingsList = data['response'][0]?.league?.standings[0];
        this.loading = false;
      });
  }
}
