import { Pipe, PipeTransform } from "@angular/core";
import { CustomerModel } from "../customer.interface";

@Pipe({ name: 'custmerFilter' })
export class FilterPipe implements PipeTransform {
    transform(customers: Array<CustomerModel>, searchInfo: string, searchOption: string) {
        if (!customers) {
            return [];
        }

        if (!searchInfo) {
            return customers;
        }

        searchInfo = searchInfo.toLocaleLowerCase();

        return customers.filter((customer: CustomerModel) => {
            if (searchOption == 'CPF') {
                return customer.customerDocument.includes(searchInfo);
            }

            if (searchOption == 'Data de Nascimento') {
                return customer.customerBirth.includes(searchInfo);
            }

            return customer.customerName.toLocaleLowerCase().includes(searchInfo) || customer.customerSurname.toLocaleLowerCase().includes(searchInfo);
        });
    }
}