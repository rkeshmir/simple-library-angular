import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ShelvesComponent } from './shelves/shelves.component';
import { ShelfComponent } from './shelf/shelf.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    MessagesComponent,
    HomeComponent,
    HeaderComponent,
    ShelvesComponent,
    ShelfComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
