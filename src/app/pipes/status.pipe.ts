import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})

export class EstatusPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {

    switch (value) {
      case "Published":

        return`<p class="text-green-600">Publicado</p>`


      default:
        return`<p class="text-red-600">Publicado</p>`

    }
  }
}
