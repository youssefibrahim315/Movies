import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { rout } from 'src/app/core/config/routes';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: rout.movies.login,
        component: SignInComponent
      },
      {
        path: rout.movies.register,
        component: SignUpComponent
      },
      {
        path: '',
        redirectTo: rout.movies.login,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
