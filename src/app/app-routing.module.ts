import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import {HomeComponent} from './home/home.component';
import {ShelvesComponent} from './shelves/shelves.component';
import {ShelfComponent} from './shelf/shelf.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shelves', component: ShelvesComponent },
  { path: 'shelf/:title', component: ShelfComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
