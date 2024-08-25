import { Component } from '@angular/core';
import { KCDBServices } from '../../services/domains-physics.service';
import { ActivatedRoute } from '@angular/router';
import { ReferenceDatum, Servicio } from '../../interfaces/kcdb.models';
import { Subject } from 'rxjs';
import { Datum } from '../../interfaces/kcdbChe.interface';
import { DomainCHEMBIOService } from '../../services/domain-chem-bio.service';

@Component({
  selector: 'app-domain-chembio',
  templateUrl: './domain-chembio.component.html',
  styles: ``
})
export class DomainCHEMBIOComponent {

  public debounce: Subject<boolean> = new Subject();


  public servicio?: Servicio
  public servicioData: Datum[] = [];
  public selectServiceModal?: any;

  private physicsCode?: string;

  private uno = "";
  private dos = "";
  public sin = false;

  public areaMetrologia: ReferenceDatum[] = []
  public areaMetrologiaId: string = "0"
  private metrologyAreaLabel = "EM";

  public categorias: ReferenceDatum[] = []
  public categoriaId: string = "0";
  private categoriaLabel?: string;

  public service: ReferenceDatum[] = []
  public serviceId: string = "0";

  public subService: ReferenceDatum[] = []
  public subServiceId: string = "0";

  public serviceIndividual: ReferenceDatum[] = []
  public serviceIndividualId: string = "0";

  public area: string = ""
  public numPaginas: number = 0;
  public pageNumber: number = 0;
  public totalItems: number = 0;

  public encabezado: string = ""
  private keywords: string = "mexico"
  public selectNumber: number = 1;

  constructor(private kcdbService: KCDBServices,
    private kcdbChemService: DomainCHEMBIOService,
    private routerActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.routerActive.params.subscribe(param => {
      this.area = param["id"];

      this.kcdbService.getMetrologyArea(this.area).subscribe(
        results => {

          this.areaMetrologia = results.referenceData;
          this.encabezado = this.areaMetrologia[0].value;
          this.metrologyAreaLabel = this.areaMetrologia[0].label;
          this.areaMetrologiaId = this.areaMetrologia[0].id.toString();

          this.kcdbChemService.geCategorias().subscribe(
            result => {
              this.categorias = result.referenceData;

            }
          )

          this.getDataChem()
        }
      )

    })

  }

  private getDataChem(num: number = 0) {
    this.servicioData = [];
    this.totalItems = 0;
    this.kcdbChemService.getSearchDataCHEMBIO({
      page: num,
      pageSize: 20,
      metrologyAreaLabel: this.metrologyAreaLabel,
      keywords: this.keywords,
      categoryLabel: this.categoriaLabel
    }).subscribe(
      res => {
        if (res.data.length == 0) {
          this.sin = true;
          this.numPaginas = 0;
          this.selectNumber = 0;

          return
        }
        this.numPaginas = res.totalPages;
        this.totalItems = res.totalElements;
        res.data = res.data.map(res => {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = res.cmc.unit;
          res.cmc.unit = tempDiv.innerText;

          return res
        })

        this.servicioData = res.data;

      }
    )
  }


  private getDataChemTodos(num: number = 0) {
    this.servicioData = [];
    this.kcdbChemService.getQuickSearch(num, "mexico",20).subscribe(
      res => {
        this.numPaginas = res.totalPages;
        this.totalItems = res.totalElements;
        res.data = res.data.map(res => {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = res.cmc.unit;
          res.cmc.unit = tempDiv.innerText;

          return res
        })

        this.servicioData = res.data;

      }
    )
  }

  selectArea() {
    if (this.areaMetrologiaId == "0") {
      this.getDataChemTodos();
      this.categorias = [];
    this.numPaginas = 0

      return
    }
    this.numPaginas = 0;
    this.servicioData = [];
    this.keywords = "";
    const select = this.areaMetrologia.filter(e => e.id.toString() == this.areaMetrologiaId)[0]
    this.metrologyAreaLabel = select.label;
    this.encabezado = select.value + ": ";

    this.kcdbChemService.geCategorias().subscribe(
      result => {
        this.categorias = result.referenceData;

      }
    )

    this.kcdbChemService.getSearchDataCHEMBIO({
      page: 0,
      pageSize: 20,
      metrologyAreaLabel: this.metrologyAreaLabel,
      keywords: this.keywords,
    }).subscribe(
      res => {
        this.servicioData = res.data;
        this.numPaginas = res.totalPages
      })
  }

  selectCategorias() {
    const select = this.categorias.filter(e => e.value.toString() == this.categoriaId)[0];
    this.categoriaLabel = select.label;

    this.getDataChem()
    // this.kcdbService.getService(this.categoriaId.trim()).subscribe(result => {
    //   this.service = result.referenceData;
    // })
  }

  selectService() {
    const select = this.service.filter(e => e.id.toString() == this.serviceId)[0];
    this.uno = select.label;
    this.kcdbService.getSubService(this.serviceId.trim()).subscribe(result => {
      this.subService = result.referenceData;
    })
  }

  selectSubService() {
    const select = this.subService.filter(e => e.id.toString() == this.subServiceId)[0];
    this.dos = select.label;
    this.kcdbService.getIdividualService(this.subServiceId.trim()).subscribe(
      results => {
        this.serviceIndividual = results.referenceData;
      }
    )
  }

  selectServiceIndividual() {
    const select = this.serviceIndividual.filter(e => e.id.toString() == this.serviceIndividualId)[0];
    // this.tres = select.label;
  }



  onClick(id: number) {
    this.selectServiceModal = this.servicioData.filter((e: any) => e.id == id)[0];
  }

  debounceNum(num: number) {
    num = num - 1;
    this.servicioData = [];
    this.selectNumber = num + 1;

    if (this.areaMetrologiaId === "0") {
      this.getDataChemTodos(num);
      return
      }
    this.getDataChem(num)
  }

  search(query: string) {

    this.servicioData = [];
    this.kcdbChemService.getQuickSearch(0, query,20, ).subscribe(res => {

      if (res.data.length == 0) {
        this.sin = true;
        return
      }

      this.servicioData = res.data;
      const id = this.areaMetrologia.filter(e => e.label == this.servicioData[0].metrologyAreaLabel);
      this.areaMetrologiaId = id[0].id.toString()



    })

    // const filter = JSON.parse(localStorage.getItem("serviciosChembio")!) as any[]

    // this.servicioData = filter.filter(e => {
    //   return String(e.kcdbCode).toLowerCase().includes(query.toLowerCase()) ||
    //     String(e.nmiServiceCode).toLowerCase().includes(query.toLowerCase()) ||
    //     String(e.categoryValue).toLowerCase().includes(query.toLowerCase()) ||
    //     String(e.rmo).toLowerCase().includes(query.toLowerCase()) ||
    //     String(e.subCategoryValue).toLowerCase().includes(query.toLowerCase())
    // })

  }

  quitar() {
    this.selectServiceModal = undefined;
  }

}
