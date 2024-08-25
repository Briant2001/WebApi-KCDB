import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Branchs, MetrologyArea, QuickSearch, Servicio } from '../interfaces/kcdb.models';
import { ServiciosRadiation } from '../interfaces/kcdb.radiation.interface';
interface Parametros {
  page: number
  pageSize: number
  metrologyAreaLabel: string,
  branchLabel?: string,
  keywords: string,
}

@Injectable({providedIn: 'root'})
export class RadiationKCDBService {
  private readonly _baseURLKCDB = "https://www.bipm.org/api/kcdb"
  constructor(private httpClient: HttpClient) { }


  getMetrologyArea(area: string): Observable<MetrologyArea> {

    const params = new HttpParams().set('domainCode', area);

    return this.httpClient.get<MetrologyArea>(`${this._baseURLKCDB}/referenceData/metrologyArea`, { params })
  }

  getSearchDataPhysics(parametro: Parametros, domain: string): Observable<ServiciosRadiation> {
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
    }

    return this.httpClient.post<ServiciosRadiation>(`${this._baseURLKCDB}/cmc/searchData/${domain.toLowerCase()}`, body).pipe(
      tap(resilt => {
        localStorage.setItem("serviciosRadiation", JSON.stringify(resilt.data))
      })
    )
  }

  getBranch(areaId: string): Observable<Branchs> {
    const params = new HttpParams().set("areaId", areaId)
    return this.httpClient.get<Branchs>(`${this._baseURLKCDB}/referenceData/branch`, { params })
  }
  getQuickSearch(page: number, pageSize: number,keywords:string): Observable<QuickSearch> {
    const body = {
      page,
      pageSize,
      showTable: false,
      keywords:keywords,
      includedFilters: [
        "cmcDomain.RADIATION"
      ],
    }

    console.log(body)

    return this.httpClient.post<QuickSearch>(`${this._baseURLKCDB}/cmc/searchData/quickSearch`, body)
  }

}
