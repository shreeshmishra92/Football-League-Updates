import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StandingsComponent } from './standings/standings.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddHeaderInterceptor } from '../app/interceptor/add-header-interceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StandingsComponent,
    FixturesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor , multi:true
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
