import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Branchs, Datum, Domains, QuickSearch, ReferenceDatum, Servicio } from '../../interfaces/kcdb.models';
import { KCDBServices } from '../../services/domains-physics.service';
import { Router } from '@angular/router';
import { DomainCHEMBIOService } from '../../services/domain-chem-bio.service';
import { RadiationKCDBService } from '../../services/domain-radiation.service';
import { DataAnalitos } from '../../interfaces/kcdbChe.interface';
import { count } from 'rxjs';

interface ServicioTotal {
  are: string
  total: number
}

@Component({
  selector: 'app-domains-pages',
  templateUrl: './domains-pages.component.html',
  styles: ``
})
export class DomainsPagesComponent implements AfterViewInit, OnInit{

  public domainsData?: Domains

  public areaMetrologia: ReferenceDatum[] = [];
  public categorias?: ReferenceDatum[];
  public branchs?: ReferenceDatum[]
  public quick?: QuickSearch
  public quickChem?: QuickSearch

  public total?: Servicio

  public analitos: ReferenceDatum[] = [];

  items = []; // Lista de items
  branchData: { [key: string]: ReferenceDatum[] } = {}; // Mapa para almacenar datos de cada item
  selectedItemId: number | null = null; // Id del item seleccionado

  public totalAreaP = 0;
  public totalAreaC = 0;


  constructor(private kcbd: KCDBServices, private routes: Router,
    private kcdbChembioService: DomainCHEMBIOService,
    private kcdbRadiationService: RadiationKCDBService
  ) { }


  ngAfterViewInit(): void {

  }



  ngOnInit(): void {
    this.kcbd.getDomain().subscribe(
      results => {
        this.domainsData = results;
        // this.domainsData.domains = this.domainsData.domains.filter(e => e.code != "RADIATION");
      }
    );

    this.kcbd.getMetrologyArea("PHYSICS").subscribe(
      results => {
        this.areaMetrologia = results.referenceData;

      })

    this.kcbd.getQuickSearch(0, "mexico").subscribe(
      re => {
        this.quick = re;

        this.totalAreaP = this.quick.filtersList[0].children[1].count
        this.totalAreaC = this.quick.filtersList[0].children[0].count;

      }
    );

    this.kcdbChembioService.getQuickSearch(0, "mexico").subscribe(
      results => {
        this.kcdbChembioService.getQuickSearch(0, "mexico", results.totalElements).subscribe(
          results => {

          }
        )
      })

    this.kcdbChembioService.geCategorias().subscribe(
      results => {
        this.categorias = results.referenceData;
      }
    )



  }


  getMetroloyArea(area: string) {

    switch (area) {
      case "PHYSICS":
        this.routes.navigateByUrl(`kcdb/metrologyArea/physics/${area}`);
        break
      case "CHEM-BIO":
        this.routes.navigateByUrl(`kcdb/metrologyArea/chem-bio/${area}`);
        break
      case "RADIATION":
        this.routes.navigateByUrl(`kcdb/metrologyArea/radiation/${area}`);
        break
      default:
        break;
    }

    if (area == "PHYSICS") {
      return;
    }


  }
  getDta(id:string){
    return this.branchData[id]
  }

  countServicios(id: string, item: HTMLDivElement) {

    if (item.classList.contains("show")) {
      this.show(item)
      return
    }

    this.show(item)
    item.children[0].textContent = "Consultado...";

    const na = this.areaMetrologia.filter(e => e.label == id);
    let cant = 0;

    this.kcbd.getBranch(na[0].id.toString()).subscribe(
      resul => {
        this.branchs = resul.referenceData;
        this.branchData[id] = resul.referenceData;

        const tabla = item.children[1] as HTMLDivElement;
        tabla.style.display = "block";
        item.children[0].classList.add("hidden");

        const n = setInterval(() => {

          const table = item.children[1].children[0].children[1] as HTMLTableElement;
          for (let index = 0; index < this.branchs!.length; index++) {

            const cantidad = this.quick?.filtersList[1].children.filter(e => e.name == this.branchs![index].value)

            if (cantidad?.length === 0) {
              cant += 0;
              table.children[index].children[1].textContent = "0";

            } else {
              cant += cantidad![0].count;
              table.children[index].children[1].textContent = `${cantidad![0].count.toString()}`;
            }

            clearInterval(n);
          }

          table.children[this.branchs!.length].children[1].textContent = `${cant}`



        }, 200);
      }
    )
  }

  get(id:string){
    this.kcbd.getSearchDataPhysics({ page: 0, metrologyAreaLabel: id, keywords: "mexico" }, "PHYSICS").subscribe(
      results => {
        return results.totalElements;
      }
    );
    return "0"
  }

  show(item: HTMLDivElement) {
    item.classList.toggle("show")
    item.classList.toggle("collapse")
    item.style.display = (item.style.display == "none") ? "block" : "none";

  }

  countServiciosChembio(id: string, item: HTMLDivElement) {
    this.analitos = []
    if (item.classList.contains("show")) {
      this.show(item)
      return
    }
    this.show(item);
    item.children[0].textContent = "Consultado...";

    this.kcdbChembioService.getSearchDataCHEMBIO({ page: 0, pageSize: 1, keywords: "mexico", metrologyAreaLabel: "QM", categoryLabel: id.toString() })
      .subscribe(
        results => {
          results.totalElements;
          item.children[0].textContent = "Total de servicios: " + results.totalElements;
          // item.children[1].textContent = "Consultado analitos...";
          // this.kcdbChembioService.
          //   getSearchDataCHEMBIO({ page: 0, pageSize: results.totalElements, keywords: "mexico", metrologyAreaLabel: "QM", categoryLabel: id.toString() }).
          //   subscribe(results => {

          //     this.kcdbChembioService.getAnalitos().subscribe(e => {

          //       item.children[1].classList.add("hidden");



          //       for (let i = 0; i < results.data.length; i++) {
          //         for (let j = 0; j < e.referenceData.length; j++) {
          //           let a = 0
          //           if (results.data[i].analyteValue == e.referenceData[j].label) {
          //             this.analitos.push(e.referenceData[j])
          //           }

          //         }
          //       }


          //     })



          //   })
        }
      )



  }


}
