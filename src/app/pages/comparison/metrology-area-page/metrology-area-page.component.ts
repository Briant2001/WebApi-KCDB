import { Component } from '@angular/core';
import { Subject, tap } from 'rxjs';
import {  ReferenceDatum, Servicio } from '../../../interfaces/kcdb.models';
import { ActivatedRoute } from '@angular/router';
import { ComparisonsService } from '../../../services/comparisons.service';
import { Comparisons, Datum, ParamasSearchComparisons, SubFieldAM } from '../../../interfaces/kcdb-comparisons.interface';

@Component({
  selector: 'app-metrology-area-page',
  templateUrl: './metrology-area-page.component.html',
  styles: ``
})
export class MetrologyAreaPageComponent {

  public debounce: Subject<boolean> = new Subject();

  private params: ParamasSearchComparisons={
    keywords:"mexico",
        page:0,
        size:1000,
        draw:"1",
        start:"",
        length:"10",
        sort:"",
        areaId:"",
        subfieldId:"",
        comparisonType:"",
        organizationId:"",
        startYear:"",
        endYear:"",
        _:"1731432328140",
  }

  public comparisons?: Comparisons;
  public comparisonsData: Datum[] = [];
  public comparisonsDataALL: Datum[] = [];
  public selectServiceModal?: Datum;

  public sin: boolean = false;

  public areaMetrologia: ReferenceDatum[] = []
  public areaMetrologiaId: string = ""
  private metrologyAreaLabel:number = 0;

  public branch: SubFieldAM[] = []
  public branchId: string = "";

  public keyComparison:string="";
  public piloto:string="CENAM";

  public area: string = ""
  public totalItems: number = 0;
  public selectNumber: number = 1;

  constructor(private comparisonsService: ComparisonsService, private routerActive: ActivatedRoute) { }

  ngOnInit(): void {

    this.getDataComparisons();

    this.routerActive.params.subscribe(param => {
      this.area = param["id"];

      this.comparisonsService.makeParallelRequests().subscribe(
        results => {
          this.areaMetrologia = results.firstRequest.referenceData.concat(results.secondRequest.referenceData.concat(results.treeRequest.referenceData));

        }
      )
    });

  }

  private getDataComparisons(){

    this.comparisonsData = [];

    this.comparisonsService.getDataComparisons(
      this.params
    ).subscribe(results => {
      this.comparisonsDataALL = results.data;

      if (this.piloto === "CENAM") {
        this.filterByPilot(results.data);
        return
      }

      if (results.data.length==0) {
        this.sin = true;

        return
      }
      this.totalItems = results.allCmcs.length;
      this.comparisonsData = this.getPageItems(1)
    })

  }

  aplicar(){
    this.totalItems = 0;
    this.params.page = 0;
    this.selectNumber = 1;
    this.getDataComparisons();

  }

  selectArea() {
    if (this.areaMetrologiaId == "") {
      this.params.areaId = this.areaMetrologiaId;
      this.params.subfieldId = "";
      this.branchId = ""
      this.branch = []
      return
    }
    // this.servicioData = [];

    const select = this.areaMetrologia.filter(e => e.id.toString() == this.areaMetrologiaId)[0];
    this.metrologyAreaLabel = select.id;
    this.params.areaId = this.metrologyAreaLabel.toString();

    this.comparisonsService.getSubField(this.areaMetrologiaId.trim()).subscribe(
      result => {
        if (result) {
          this.branch = result
        }
      }
    )

    // this.getDataPhysics();

  }

  selectBranch() {
    this.params.subfieldId = this.branchId;
  }

  selectComparison(){
    this.params.comparisonType = this.keyComparison;
  }

  debounceNum(num: number) {
    this.setPage(num);
    this.comparisonsData = this.getPageItems(num)
  }

  checked(check:boolean){

    if (check == true) {
      this.filterByPilot(this.comparisonsData)

    }else{
      this.getDataComparisons();
    }
  }

  filterByPilot(data:Datum[]){

    this.comparisonsDataALL =  data.filter(e=> e.instituteCode=="CENAM");
    this.totalItems=this.comparisonsDataALL.length;
    this.comparisonsData = this.getPageItems(1);

    if (this.comparisonsData.length == 0) {
      this.sin = true;
    }

  }

  // Método para obtener los elementos de la página actual
  getPageItems(page: number) {
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    return this.comparisonsDataALL .slice(startIndex, endIndex);
  }

  // Número total de páginas
  get totalPages() {
    return Math.ceil(this.comparisonsDataALL.length / 20);
  }

  // Cambiar la página actual
  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.selectNumber = page;


    }
  }

  verGrap(id:number){
    window.open(`https://www.bipm.org/kcdb/comparison?id=${id}#graphsTab`, "popup", "location=no,width=800,height=2000");

  }

  verInfo(id:number){
    window.open(`https://www.bipm.org/kcdb/comparison?id=${id}`, "popup", "location=no,width=800,height=2000");

  }


}
