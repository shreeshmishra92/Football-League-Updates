import { Component, OnInit } from '@angular/core';
import { FootballappService } from '../service/footballapp.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Standings } from '../interface/standings'
@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  leagueId = this.route.snapshot.params['leagueId'];
  standings:Array<any>=[];
  currentSeason = new Date().getFullYear();
  constructor(private footballDataService:FootballappService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.standings=JSON.parse(localStorage.getItem('standings')|| "{}");
  

    
  }

ngDoCheck(){
  if(localStorage.getItem('standings')){
  this.standings=JSON.parse(localStorage.getItem('standings')|| "{}");
}
}
}
