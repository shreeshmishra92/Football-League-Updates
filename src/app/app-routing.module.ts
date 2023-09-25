import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixturesComponent } from './fixtures/fixtures.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'fixture/:leagueId/:teamId', component: FixturesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
