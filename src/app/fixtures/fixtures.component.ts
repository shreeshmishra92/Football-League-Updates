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
  teamId!: string;
  leagueId!: string;
  loading: boolean = false;
  constructor(
    private footballDataService: FootballappService,
    private route: ActivatedRoute
  ) {}

  currentSeason = new Date().getFullYear();
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.leagueId = params.get('leagueId')!;
      this.teamId = params.get('teamId')!;
    });

    this.loading = true;

    this.footballDataService
      .getfixtures(this.leagueId, this.teamId)
      .subscribe((res) => {
        let data = JSON.parse(JSON.stringify(res));
        this.loading = false;
        this.fixtures = data['response'];
      });
  }
}
