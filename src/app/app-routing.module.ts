import { PageMillSelectComponent } from './routs/mill-select/page-mill-select.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageMillInputComponent } from './routs/mill-input/page-mill-input';

export const routes: Routes = [
  {
    path: 'mill-select', component: PageMillSelectComponent
  },
  {
    path: 'mill-input', component: PageMillInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
