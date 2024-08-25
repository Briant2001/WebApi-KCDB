import { Pipe, PipeTransform } from '@angular/core';
import { KCDBServices } from '../services/domains-physics.service';

@Pipe({
  name: 'totalPhysics'
})

export class TotalServicePipe implements PipeTransform {

  constructor (private kcdbPhysicsService:KCDBServices){

  }

  transform(value: any, ...args: any[]): any {


        this.kcdbPhysicsService.getSearchDataPhysics({page:0,pageSize:2,keywords:"mexico",metrologyAreaLabel:value},"PHYSICS").subscribe(
          res=>{

            const n = document.getElementById(value)!
            n.classList.add("text-gray-500")
            n.textContent =` Total servicios: ${res.totalElements}`;


          }
        )



  }
}
