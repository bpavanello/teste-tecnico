import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrl: './customer-management.component.sass'
})
export class CustomerManagementComponent {

  public activeMenu: string = 'lista';

  constructor(
    private router: Router,
  ) { }

  public navigateTo(route: string) {
    this.activeMenu = route;
    this.router.navigate(['gestao-clientes', route]);
  }
}
