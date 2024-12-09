import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, forkJoin, Observable, of, tap } from 'rxjs';
import { MetrologyArea } from '../interfaces/kcdb.models';
import { CategoriasChemBio } from '../interfaces/kcdbChe.interface';
import { Comparisons, ParamasSearchComparisons, SubFieldAM } from '../interfaces/kcdb-comparisons.interface';
import { CMCByArea } from '../interfaces/graficas.interface';

@Injectable({providedIn: 'root'})
export class ComparisonsService {
  private readonly _baseApiURLKCDB = "https://www.bipm.org/api/kcdb";
  private readonly _baseURLKCDB = "https://www.bipm.org/kcdb";
  constructor(private httpClient: HttpClient) { }

  makeParallelRequests() {
    return forkJoin({
      firstRequest: this.getAreasPhy(),
      secondRequest: this.getAreaChem(),
      treeRequest: this.getAreasRad(),
    }).pipe(
      tap(re=> re.firstRequest.referenceData.concat(re.secondRequest.referenceData.concat(re.treeRequest.referenceData)))
    )
  }

  private getAreasPhy():Observable<MetrologyArea>{
    return this.httpClient.get<MetrologyArea>(`${this._baseApiURLKCDB}/referenceData/metrologyArea?domainCode=PHYSICS`)
  }

  private getAreaChem():Observable<MetrologyArea>{
    return this.httpClient.get<CategoriasChemBio>(`${this._baseApiURLKCDB}/referenceData/metrologyArea?domainCode=CHEM-BIO`)
  }

  private getAreasRad():Observable<MetrologyArea>{
    return this.httpClient.get<MetrologyArea>(`${this._baseApiURLKCDB}/referenceData/metrologyArea?domainCode=RADIATION`)
  }

  getBranchByArea(areaId: string):Observable<MetrologyArea | null>{
    const params = new HttpParams().set("areaId ",areaId)
    return this.httpClient.get<MetrologyArea>(`${this._baseApiURLKCDB}/referenceData/branch`,{
      params
    }).pipe(
      catchError(err=> of(null))
    )
  }

  getSubField(areaId:string):Observable<SubFieldAM[] | null>{

    const params = new HttpParams().set("areaId",areaId)

    return this.httpClient.get<SubFieldAM[]>(`${this._baseURLKCDB}/get/active-subfields/by-metrology-area-id`,{
      params
    }).pipe(
      catchError(err=> of(null))
    )

  }

  getDataComparisons(p:ParamasSearchComparisons):Observable<Comparisons>{
    const params = new HttpParams().
    set("keywords",p.keywords).
    set("draw",p.draw).
    set("start",p.start).
    set("length",p.length).
    set("page",p.page).
    set("size",p.size).
    set("sort",p.sort).
    set("areaId",p.areaId).
    set("subfieldId",p.subfieldId).
    set("comparisonType",p.comparisonType).
    set("organizationId",p.organizationId).
    set("startYear",p.startYear).
    set("endYear",p.endYear);

    return this.httpClient.get<Comparisons>(`${this._baseURLKCDB}/comparison/search/results`,
      {
        params
      }
    )

  }

  getDataComparisonsTotal(p:any):Observable<Comparisons>{
    const params = new HttpParams().
    set("keywords",p.keywords).
    set("draw",p.draw).
    set("start",p.start).
    set("length",p.length).
    set("page",p.page).
    set("size",p.size).
    set("sort",p.sort).
    set("areaId",p.areaId).
    set("subfieldId",p.subfieldId).
    set("comparisonType",p.comparisonType).
    set("organizationId",p.organizationId).
    set("startYear",p.startYear).
    set("endYear",p.endYear);

    return this.httpClient.get<Comparisons>(`${this._baseURLKCDB}/comparison/search/results`,
      {
        params
      }
    )

  }

  getGrafica():Observable<CMCByArea[]>{

    return this.httpClient.get<CMCByArea[]>(`${this._baseURLKCDB}/cmc/statistics/public-list?countryIds=53&filterType=COUNTRY&type=METROLOGY_AREA`).pipe(
      catchError(err=> of([]))
    )
  }

  getGrafica2():Observable<CMCByArea[]>{

    return this.httpClient.get<CMCByArea[]>(`${this._baseURLKCDB}/cmc/statistics/public-list?startYear=2020&endYear=2024&countryIds=53&filterType=COUNTRY&type=APPROVAL_YEAR`).pipe(
      catchError(err=> of([]))
    )
  }

}
