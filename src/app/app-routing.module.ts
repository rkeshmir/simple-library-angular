import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import {HomeComponent} from './home/home.component';
import {ShelvesComponent} from './shelves/shelves.component';
import {ShelfComponent} from './shelf/shelf.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'shelves', component: ShelvesComponent },
  { path: 'shelf/:title', component: ShelfComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
