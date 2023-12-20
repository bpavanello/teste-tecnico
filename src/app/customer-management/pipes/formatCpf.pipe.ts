import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'CPF' })
export class FormatCpfPipe implements PipeTransform {
    transform(value: string) {
        return value.padStart(11, '0').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
}