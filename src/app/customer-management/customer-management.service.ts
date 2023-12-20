import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CustomerModel } from './customer.interface';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {

  private customerUrl: string = 'http://localhost:3000/customerRecord';

  constructor(
    private http: HttpClient
  ) { }

  public GetCustomers() {
    return this.http.get(this.customerUrl);
  }

  public GetCustomerById(id: string): Observable<CustomerModel> {
    const composeUrl = `${this.customerUrl}/${id}`;

    return this.http.get<CustomerModel>(composeUrl);
  }

  public UpdateCustomer(id: string, customer: CustomerModel) {
    const composeUrl = `${this.customerUrl}/${id}`;

    return this.http.put(composeUrl, customer);
  }

  public DeleteCustomer(id: string) {
    const composeUrl = `${this.customerUrl}/${id}`;

    return this.http.delete(composeUrl);
  }

  public CreateCustomer(customer: CustomerModel) {
    const dateToday = new Date();
    const year = dateToday.getFullYear();
    const  month = dateToday.getMonth().toString().padStart(2, '0');
    const day = dateToday.getDate().toString().padStart(2, '0');

    customer.registrationDate = `${day}${month}${year}`;
    
    return this.http.post(this.customerUrl, customer).pipe(first())
  }
}
