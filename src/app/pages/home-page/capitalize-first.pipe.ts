import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst',
  standalone: true
})
export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: any): string {
    if (!value || typeof value !== 'string') return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}