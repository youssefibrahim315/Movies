import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionBtnComponent } from './components/action-btn/action-btn.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    HomeComponent,
    MovieListComponent,
    ActionBtnComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    SharedModule
  ],
  exports:[HomeComponent]
})
export class HomeModule { }
