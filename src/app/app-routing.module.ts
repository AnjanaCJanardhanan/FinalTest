import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '',redirectTo: 'auth/login', pathMatch: 'full'
  },
  {
    path:'customers',
    component:CustomersComponent,
    loadChildren: () => import('./customers/customers.module')
  .then(x=>x.CustomersModule)

  },
  {
    path:'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module')
    .then(x=>x.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
