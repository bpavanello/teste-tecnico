import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'BrDate' })
export class FormatDateBr implements PipeTransform {
    transform(value: string) {
        return value.replace(/(\d{2})(\d{2})(\d{4})/g, '\$1/\$2/\$3');
    }
}