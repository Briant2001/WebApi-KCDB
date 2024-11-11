import { Component, OnInit } from '@angular/core';
import { KCDBServices } from '../../../services/domains-physics.service';
import { ActivatedRoute } from '@angular/router';
import { Datum, ReferenceDatum, Servicio } from '../../../interfaces/kcdb.models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-metrology-area-pages',
  templateUrl: './domains-physics.pages.html',
  styleUrl: `./domains-physics.pages.css`
})
export class MetrologyAreaPagesComponent implements OnInit {

  public debounce: Subject<boolean> = new Subject();


  public servicio?: Servicio
  public servicioData: Datum[] = [];
  public selectServiceModal?: Datum;

  private physicsCode?: string;

  public sin:boolean = false;
  private dos = "";
  private tres = "";

  public areaMetrologia: ReferenceDatum[] = []
  public areaMetrologiaId: string = "0"
  private metrologyAreaLabel = "EM";

  public branch: ReferenceDatum[] = []
  public branchId: string = "0";
  private branchLabel?: string;

  public service: ReferenceDatum[] = []
  public serviceId: string = "0";

  public subService: ReferenceDatum[] = []
  public subServiceId: string = "0";

  public serviceIndividual: ReferenceDatum[] = []
  public serviceIndividualId: string = "0";

  public area: string = ""
  public numPaginas: number = 0;
  public numcurrenPage: number = 1;
  public pageNumber: number = 0;
  public numElemens: number = 0;
  public totalItems: number = 0;

  public encabezado: string = ""
  private keywords: string = "mexico"
  public selectNumber: number = 1;

  constructor(private kcdbService: KCDBServices, private routerActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.routerActive.params.subscribe(param => {
      this.area = param["id"]

      this.kcdbService.getMetrologyArea(this.area).subscribe(
        results => {
          this.areaMetrologia = results.referenceData;
          this.metrologyAreaLabel = this.areaMetrologia[0].label;
          this.areaMetrologiaId = this.areaMetrologia[0].id.toString();
          this.kcdbService.getBranch(this.areaMetrologiaId.trim()).subscribe(
            result => {
              this.branch = result.referenceData;
            }
          )
          this.getDataPhysics()

        }
      )
    })
  }

  private getDataPhysics(numPage: number = 0) {

    this.servicioData=[];
    this.totalItems = 0;
    this.kcdbService.getSearchDataPhysics({
      page: numPage,
      pageSize: 30,
      metrologyAreaLabel: this.metrologyAreaLabel!,
      keywords: this.keywords,
      branchLabel:this.branchLabel
    }, this.area).subscribe(
      res => {
        if (res.data.length == 0) {
          this.sin = true;
          return
        }
        this.numPaginas = res.totalPages;
        this.totalItems =res.totalElements;
        this.selectNumber = res.pageNumber +1;
        res.data = res.data.map(res=> {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = res.cmc.unit;
          res.cmc.unit = tempDiv.innerText;

          return res
        })

        this.servicioData = res.data;
      }
    )
  }

  private getDataPhysicsTodos(numPage: number = 0) {
    this.totalItems = 0
    this.servicioData=[];
    this.kcdbService.getQuickSearch(
      numPage,"mexico",["cmcDomain.PHYSICS"],20,).subscribe(
      res => {
        this.numPaginas = res.totalPages;
        this.totalItems =res.totalElements;
        res.data = res.data.map(res=> {
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
      this.getDataPhysicsTodos();
      this.branch =[];
      this.numPaginas=0;
      return
    }
    this.numPaginas = 0;
    this.servicioData = [];
    this.keywords = "mexico";
    this.branchLabel = "";

    const select = this.areaMetrologia.filter(e => e.id.toString() == this.areaMetrologiaId)[0];
    this.metrologyAreaLabel = select.label;


    this.kcdbService.getBranch(this.areaMetrologiaId.trim()).subscribe(
      result => {
        this.branch = result.referenceData;

        // for (let index = 0; index < this.branch.length; index++) {
        //   this.encabezado = this.encabezado + "  • " + this.branch[index].value
        // }
      }
    )

    this.getDataPhysics();



  }

  selectBranch() {
    this.numPaginas = 0;
    this.totalItems = 0;
    const select = this.branch.filter(e => e.id.toString() == this.branchId)[0];
    this.branchLabel = select.label;
    this.getDataPhysics();

    // this.kcdbService.getService(this.branchId.trim()).subscribe(result => {
    //   this.service = result.referenceData;
    //   for (let index = 0; index < this.branch.length; index++) {
    //     this.encabezado = this.encabezado +"  • "+ this.branch[index].value
    //   }
    // })
  }

  selectService() {
    const select = this.service.filter(e => e.id.toString() == this.serviceId)[0];
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
    this.tres = select.label;
  }

  onClick(id: number) {
    this.selectServiceModal = this.servicioData.filter((e: any) => e.id == id)[0];
    const tempDiv = document.createElement('div');
    // tempDiv.innerHTML = this.selectServiceModal.;
  }

  debounceNum(num: number) {
    num = num - 1;
    this.sin = false;
    if (this.numPaginas==1) {
      return
    }
    this.servicioData = [];
    this.selectNumber = num + 1;

    if (this.areaMetrologiaId === "0") {
      this.getDataPhysicsTodos(num);
      return
    }

    this.getDataPhysics(num);
  }

  isVacio(query: string){
    query = query.trim();
    if (query == '') {
      this.sin =false;
      this.numPaginas= 0;
      this.getDataPhysics();

    }
  }

  search(query: string) {
    query = query.trim();
    this.servicioData =[];
    this.numPaginas = 0;
    this.selectNumber = 0;
    this.totalItems = 0;
    this.kcdbService.getQuickSearch(0,query,["cmcDomain.PHYSICS"],20).subscribe(
      res=>{
        if (res.data.length==0) {
          this.sin = true;
          return
        }
        this.totalItems= res.totalElements;
        this.servicioData = res.data;
        const id = this.areaMetrologia.filter(e=> e.label == this.servicioData[0].metrologyAreaLabel);
        this.areaMetrologiaId = id[0].id.toString()
      }
    )

    // const filter = JSON.parse(localStorage.getItem("servicios")!) as any[]

    // this.servicioData = filter.filter(e => {
    //   return String(e.kcdbCode).toLowerCase().includes(query.toLowerCase()) ||
    //     String(e.nmiServiceCode).toLowerCase().includes(query.toLowerCase()) ||
    //     String(e.metrologyAreaLabel).toLowerCase().includes(query.toLowerCase()) ||
    //     String(e.rmo).toLowerCase().includes(query.toLowerCase()) ||
    //     String(e.branchValue).toLowerCase().includes(query.toLowerCase()) ||
    //     String(e.subServiceValue).toLowerCase().includes(query.toLowerCase())
    // })

  }

  quitar() {
    this.selectServiceModal = undefined;
  }

}
