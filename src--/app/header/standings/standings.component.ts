import { Component, OnInit } from '@angular/core';
import { FootballappService } from '../../service/footballapp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Standings } from '../../interface/standings';
@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnInit {
  leagueId = this.route.snapshot.params['leagueId'];
  standings: Standings[] = [];
  currentSeason = new Date().getFullYear();
  constructor(
    private footballDataService: FootballappService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ngOnChanges();
  }

  ngOnChanges() {
    if (this.leagueId) {
      this.footballDataService
        .getStandings(this.leagueId, this.currentSeason)
        .subscribe((res) => {
          let data = JSON.parse(JSON.stringify(res));

          this.standings = data['response'][0]?.league.standings[0];
        });
    }
  }
}
