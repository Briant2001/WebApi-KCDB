import { Pipe, PipeTransform } from '@angular/core';
import { KCDBServices } from '../services/domains-physics.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'totalPhysics'
})

export class TotalServicePipe implements PipeTransform {

  private susb = new Subscription;

  constructor(private kcdbPhysicsService: KCDBServices) {

  }

  transform(value: any, ...args: any[]): any {


    this.susb =  this.susb = this.kcdbPhysicsService.getSearchDataPhysics({ page: 0, pageSize: 2, keywords: "mexico", metrologyAreaLabel: value }, "PHYSICS").subscribe(
      res => {
        const n = document.getElementById(value);

        if (n == null) {
          return
        }
        n.classList.add("text-gray-500");
        n.textContent = `Total servicios: ${res.totalElements}`;
      }
    )
  }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

}
