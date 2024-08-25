import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CategoriasChemBio, Chembio, DataAnalitos } from '../interfaces/kcdbChe.interface';
import { HttpClient } from '@angular/common/http';
import { QuickSearch, ReferenceDatum } from '../interfaces/kcdb.models';
interface Parametros {
  page: number
  pageSize: number
  metrologyAreaLabel: string,
  categoryLabel?: string,
  analyteLabel?: string,
  keywords: string,
}
@Injectable({providedIn: 'root'})
export class DomainCHEMBIOService {

  constructor(private httpClient: HttpClient) { }

  private readonly _baseURLKCDB = "https://www.bipm.org/api/kcdb"

  getSearchDataCHEMBIO(parametro: Parametros): Observable<Chembio> {

    let body = {
      page: parametro.page,
      pageSize: parametro.pageSize,
      showTable: false,
      metrologyAreaLabel:parametro.metrologyAreaLabel,
      categoryLabel:parametro.categoryLabel,
      keywords: parametro.keywords,
      countries: [
        "MX",
        "MX",
        "MX"
      ]
    }
    return this.httpClient.post<Chembio>(`${this._baseURLKCDB}/cmc/searchData/chemistryAndBiology`, body).pipe(
      tap(result => {
        localStorage.setItem("servicios", JSON.stringify(result.data))
      })
    )
  }


  geCategorias(): Observable<CategoriasChemBio> {
    return this.httpClient.get<CategoriasChemBio>(`${this._baseURLKCDB}/referenceData/category`).pipe(
      tap(result => {
        localStorage.setItem("serviciosChembio", JSON.stringify(result.referenceData))
      })
    )
  }


  getQuickSearch( page: number,keywords:string,pageSize?: number): Observable<QuickSearch> {
    const body = {
      page,
      pageSize,
      showTable: false,
      keywords,
      includedFilters:[
        "cmcDomain.CHEM-BIO"
      ],
    }


    return this.httpClient.post<QuickSearch>(`${this._baseURLKCDB}/cmc/searchData/quickSearch`, body).pipe(
      tap(result => {
        localStorage.setItem("serviciosChembio", JSON.stringify(result.data))
      })
    )
  }

  getAnalitos():Observable<DataAnalitos>{

    return this.httpClient.get<DataAnalitos>(`${this._baseURLKCDB}/referenceData/analyte`).pipe(
      tap(result => {
        localStorage.setItem("serviciosAnalitos", JSON.stringify(result))
      })
    )
  }
}
