import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'espanol'
})

export class CambiarLenguajePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    switch (value) {
      case "CHEM-BIO":
        return "Química y Biología"
      case "PHYSICS":
        return "Física General"
      case "RADIATION":
        return "Radiación"
      default:
        break;
    }
  }
}
