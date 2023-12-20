import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { CustomerManagementComponent } from './customer-management.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full'
      },
      {
        path: 'lista',
        component: CustomerListComponent
      },
      {
        path: 'cadastro',
        component: CustomerRegistrationComponent
      },
      {
        path: 'cadastro/:id',
        component: CustomerRegistrationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
