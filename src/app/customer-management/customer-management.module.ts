import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { LayoutComponentsModule } from '../layout-components/layout-components.module';
import { CustomerManagementRoutingModule } from './customer-management-routing.module';
import { CustomerManagementService } from './customer-management.service';
import { FilterPipe } from './pipes/customer-filter.pipe';
import { FormatCpfPipe } from './pipes/formatCpf.pipe';
import { FormatDateBr } from './pipes/formatDate.pipe';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { CustomerManagementComponent } from './customer-management.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    CustomerManagementComponent,
    CustomerListComponent,
    CustomerRegistrationComponent,
    FilterPipe,
    FormatCpfPipe,
    FormatDateBr
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerManagementRoutingModule,
    LayoutComponentsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    CustomerManagementService,
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt' },
  ]
})
export class CustomerManagementModule { }
