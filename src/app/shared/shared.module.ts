import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    ToastComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[NavBarComponent,ToastComponent]
})
export class SharedModule { }
