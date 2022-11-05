import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { rout } from './core/config/routes';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

const routes: Routes = [
  {
    path: rout.movies.home,
    canActivate: [AuthenticatedGuard], 
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },

  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**', redirectTo: rout.movies.home, pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
