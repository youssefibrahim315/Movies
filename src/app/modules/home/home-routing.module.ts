import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from 'src/app/core/guards/authenticated.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard], 

    children: [
      {
        path: '',
        component: HomeComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
