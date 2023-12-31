import { Component, Input, OnInit } from '@angular/core';
import { LeagueStandings } from '../../interface/standings';

@Component({
  selector: 'app-league-standings',
  templateUrl: './league-standings.component.html',
  styleUrls: ['./league-standings.component.css'],
})
export class LeagueStandingsComponent implements OnInit {
  @Input() standingsList: LeagueStandings[] = [];
  @Input() leagueId!: number;
  @Input() loading: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
