import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CustomerManagementService } from '../customer-management.service';
import { CustomerModel } from '../customer.interface';
import { first, map } from 'rxjs';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrl: './customer-registration.component.sass'
})
export class CustomerRegistrationComponent implements OnInit {

  public submitButtonText: string = 'Enviar';

  protected form = this.formBuilder.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    document: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    incomeMonthly: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  private selectedId: string | null = null;
  private selectedRegisterDate: string | null = null; 

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerManagementService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        first()
      )
      .subscribe(params => {
        if (params && params['id'] != null) {
          this.submitButtonText = 'Atualizar';
          this.selectedId = params['id'];
          this.fillFormInfo();
        }
      });
  }

  public submitForm() {
    if (this.form.valid) {
      this.form.controls.document.enable();

      const customer: CustomerModel = {
        customerName: this.form.value.name!,
        customerSurname: this.form.value.surname!,
        customerDocument: this.form.value.document!,
        customerBirth: this.form.value.birthDate!,
        customerEmail: this.form.value.email!,
        incomeMonthly: this.form.value.incomeMonthly!
      }

      if (this.selectedId) {
        customer.registrationDate = this.selectedRegisterDate!;
        this.customerService.UpdateCustomer(this.selectedId, customer).subscribe(() => {
          this.resetForm();
        });
      } else {
        this.customerService.CreateCustomer(customer).subscribe(() => {
          this.resetForm();
        });
      }
    }
  }

  public resetForm() {
    this.selectedId = null;
    this.selectedRegisterDate = null;
    this.submitButtonText = 'Enviar';
    this.form.reset();
  }

  private fillFormInfo() {
    this.customerService.GetCustomerById(this.selectedId!)
      .pipe(
        map((customer: CustomerModel) => {
          this.form.controls.name.setValue(customer.customerName);
          this.form.controls.surname.setValue(customer.customerSurname);
          this.form.controls.email.setValue(customer.customerEmail);
          this.form.controls.incomeMonthly.setValue(customer.incomeMonthly);
          this.form.controls.birthDate.setValue(customer.customerBirth);
          this.form.controls.document.setValue(customer.customerDocument);
          this.form.controls.document.disable();

          this.selectedRegisterDate = customer.registrationDate!;
        }))
      .subscribe()
  }
}
