import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { countries } from '../interface/countryData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() countryList: countries[] = [];
  @Input() selectedCountry!:countries;
  @Output('getLeagues') getLeagues=new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  ShowCountryLeague(country:countries){
    console.log(country);
this.getLeagues.emit(country);
  }
}
