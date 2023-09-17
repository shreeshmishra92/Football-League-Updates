import { Component, OnInit } from '@angular/core';
import { FootballappService } from '../service/footballapp.service';
import { ActivatedRoute } from '@angular/router';
import { fixture } from '../interface/fixtureData';
@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
})
export class FixturesComponent implements OnInit {
  fixtures: fixture[] = [];
  teamId = this.route.snapshot.params['teamId'];
  leagueId: number = 0;
  constructor(
    private footballDataService: FootballappService,
    private route: ActivatedRoute
  ) {}

  currentSeason = new Date().getFullYear();
  ngOnInit(): void {
    this.leagueId = JSON.parse(localStorage.getItem('leagueId') || '{}');

    this.footballDataService
      .getfixtures(this.leagueId, this.teamId)
      .subscribe((res) => {
        this.fixtures = JSON.parse(JSON.stringify(res));
      });
  }
}
