import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NEVER, Observable, first } from 'rxjs';

import { CustomerManagementService } from '../customer-management.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.sass'
})
export class CustomerListComponent {
  public customers: Observable<any> = NEVER;

  public searchInfo: string = '';
  public searchOption: string = '';

  public searchOptions = [
    'Nome',
    'CPF',
    'Data de Nascimento'
  ];

  public selectedId: string | null = null;

  constructor(
    private customerService: CustomerManagementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customers = this.customerService.GetCustomers()
  }

  public EditCustomer(): void {
    if (this.selectedId != null) {
      this.router.navigate(['gestao-clientes', 'cadastro', this.selectedId]);
    }
  }

  public RemoveCustomer(): void {
    if (this.selectedId != null) {
      this.customerService.DeleteCustomer(this.selectedId!)
      .pipe(
        first()
      )
      .subscribe(() => this.customers = this.customerService.GetCustomers());
    }
  }

  public changeOption(option: string) {
    this.searchOption = option;
  }

  public selectChange(id: string) {
    this.selectedId = id;
  }
}
