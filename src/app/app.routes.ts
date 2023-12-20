import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'gestao-clientes',
        loadChildren: () => import('./customer-management/customer-management.module').then(m => m.CustomerManagementModule)
    }
];
