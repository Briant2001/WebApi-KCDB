import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { Branchs, Domains, MetrologyArea, QuickSearch, ServiceA, Servicio } from '../interfaces/kcdb.models';
import { Chembio } from '../interfaces/kcdbChe.interface';

interface Parametros {
  page: number
  pageSize?: number
  metrologyAreaLabel: string,
  branchLabel?: string,
  keywords: string,
}

@Injectable({ providedIn: 'root' })
export class KCDBServices {

  private readonly _baseURLKCDB = "https://www.bipm.org/api/kcdb"
  constructor(private httpClient: HttpClient) { }

  getSearchDataPhysics(parametro: Parametros, domain: string): Observable<Servicio> {
    let body = {
      page: parametro.page,
      pageSize: parametro.pageSize,
      showTable: false,
      metrologyAreaLabel: parametro.metrologyAreaLabel,
      branchLabel: parametro.branchLabel,
      keywords: parametro.keywords,
      countries: [
        "MX",
        "MX",
        "MX"
      ]
      // ,
      // publicDateFrom: "2005-01-31",
      // publicDateTo: `${new Date().getFullYear()}-12-31`
    }


    return this.httpClient.post<Servicio>(`${this._baseURLKCDB}/cmc/searchData/${domain.toLowerCase()}`, body).pipe(
      tap(resilt => {
        localStorage.setItem("servicios", JSON.stringify(resilt.data))
      })
    )



  }

  getQuickSearch(page: number,keywords:string,includedFilters:string[]=["cmcDomain.PHYSICS"], pageSize?: number ): Observable<QuickSearch> {
    const body = {
      page,
      pageSize,
      showTable: false,
      keywords,
      includedFilters,
    }
    console.log(body)

    return this.httpClient.post<QuickSearch>(`${this._baseURLKCDB}/cmc/searchData/quickSearch`, body)
  }

  getDomain(): Observable<Domains> {
    const headers = new HttpHeaders({
      'Accept': 'application/xml',
    });
    return this.httpClient.get<Domains>(`${this._baseURLKCDB}/referenceData/domain`).pipe(
      // map(response => this.parseXml(response)),
    )
  }

  getMetrologyArea(area: string): Observable<MetrologyArea> {

    const params = new HttpParams().set('domainCode', area);

    return this.httpClient.get<MetrologyArea>(`${this._baseURLKCDB}/referenceData/metrologyArea`, { params })
  }

  getBranch(areaId: string): Observable<Branchs> {
    const params = new HttpParams().set("areaId", areaId)
    return this.httpClient.get<Branchs>(`${this._baseURLKCDB}/referenceData/branch`, { params })
  }

  getService(branchId: string): Observable<ServiceA> {
    const params = new HttpParams().set("branchId", branchId)
    return this.httpClient.get<ServiceA>(`${this._baseURLKCDB}/referenceData/service`, { params })
  }

  getSubService(serviceId: string): Observable<ServiceA> {
    const params = new HttpParams().set("serviceId", serviceId)
    return this.httpClient.get<ServiceA>(`${this._baseURLKCDB}/referenceData/subService`, { params })
  }

  getIdividualService(subServiceId: string): Observable<ServiceA> {
    const params = new HttpParams().set("subServiceId", subServiceId)
    return this.httpClient.get<ServiceA>(`${this._baseURLKCDB}/referenceData/individualService`, { params })
  }



}
