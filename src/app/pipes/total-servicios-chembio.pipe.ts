import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { DomainCHEMBIOService } from '../services/domain-chem-bio.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'totalchem'
})

export class ChembioPipe implements PipeTransform, OnDestroy {

  constructor (private kcdbChembioService: DomainCHEMBIOService,){}
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
  private subs = new Subscription
  transform(value: any, ...args: any[]): any {
    this.subs =  this.kcdbChembioService.getSearchDataCHEMBIO({ page: 0, pageSize: 1, keywords: "mexico", metrologyAreaLabel: "QM", categoryLabel: value.toString() })
    .subscribe(
      results => {
          const n = document.getElementById(value);
          if (n==null) {
            return
          }
            n.classList.add("text-gray-500")
            n.textContent =` Total servicios: ${results.totalElements}`;

        }
      )
  }
}
