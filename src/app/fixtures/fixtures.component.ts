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
  teamId: number = 0;
  leagueId: number = 0;
  constructor(
    private footballDataService: FootballappService,
    private route: ActivatedRoute
  ) {}

  currentSeason = new Date().getFullYear();
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.leagueId = parseInt(params.get('leagueId')!);
      this.teamId = parseInt(params.get('teamId')!);
    });

    this.footballDataService
      .getfixtures(this.leagueId, this.teamId)
      .subscribe((res) => {
        let data = JSON.parse(JSON.stringify(res));

        this.fixtures = data['response'];
      });
  }
}
