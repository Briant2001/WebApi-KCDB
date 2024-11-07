import { Pipe, PipeTransform } from '@angular/core';
import { DomainCHEMBIOService } from '../services/domain-chem-bio.service';

@Pipe({
  name: 'totalchem'
})

export class ChembioPipe implements PipeTransform {

  constructor (private kcdbChembioService: DomainCHEMBIOService,){}
  transform(value: any, ...args: any[]): any {
    this.kcdbChembioService.getSearchDataCHEMBIO({ page: 0, pageSize: 1, keywords: "mexico", metrologyAreaLabel: "QM", categoryLabel: value.toString() })
    .subscribe(
      results => {
          const n = document.getElementById(value)!
            n.classList.add("text-gray-500")
            n.textContent =` Total servicios: ${results.totalElements}`;

        }
      )
  }
}
