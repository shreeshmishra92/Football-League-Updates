import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingsComponent } from './standings/standings.component';
import { HeaderComponent } from './header/header.component';
import { FixturesComponent } from './fixtures/fixtures.component';

const routes: Routes = [
  { path:'',  component:StandingsComponent },
  { path:'standings/:leagueId', component:StandingsComponent  },
  { path:'fixtures/:leagueId/:teamId', component:FixturesComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
 
  exports: [RouterModule]
})
export class AppRoutingModule { }
