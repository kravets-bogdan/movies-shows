// * Base
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/home/home.component'),
  },
  {
    path: ':category',
    loadComponent: () => import('./modules/category/category.component'),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
