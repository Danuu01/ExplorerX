import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { AppComponent } from './app.component'; 
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';

import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    TableComponent,
    DetailComponent,
    CreateComponent
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }