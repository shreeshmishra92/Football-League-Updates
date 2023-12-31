import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { FixturesComponent } from './fixtures/fixtures.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddleagueInterceptor } from '../app/interceptor/add-header-interceptor.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeagueStandingsComponent } from './dashboard/league-standings/league-standings.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  
    FixturesComponent,
    DashboardComponent,
    LeagueStandingsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, useClass: AddleagueInterceptor , multi:true
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
