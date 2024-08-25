import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { MetrologyAreaPagesComponent } from './pages/domain-physics/domains-physics.pages.component';
import { FormsModule } from '@angular/forms';
import { ModalServiceComponent } from './components/modal-service/modal-service.component';
import { DomainsPagesComponent } from './pages/domains-pages/domains-pages.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DomainCHEMBIOComponent } from './pages/domain-chembio/domain-chembio.component';
import { ModalServiceCheComponent } from './components/modal-service-che/modal-service-che.component';
import { DomainsRadiationComponent } from './pages/domains-radiation/domains-radiation.component';
import { CambiarLenguajePipe } from './pipes/cambiar-espanol.pipe';
import { ModalServiceRadiationComponent } from './components/modal-service-radiation/modal-service-radiation.component';
import { EstatusPipe } from './pipes/status.pipe';
import { TotalServicePipe } from './pipes/total-servicios.pipe';
import { ChembioPipe } from './pipes/total-servicios-chembio.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DomainsPagesComponent,
    MetrologyAreaPagesComponent,
    ModalServiceComponent,
    PaginationComponent,
    DomainCHEMBIOComponent,
    ModalServiceCheComponent,
    DomainsRadiationComponent,
    CambiarLenguajePipe,
    ModalServiceRadiationComponent,
    EstatusPipe,
    TotalServicePipe,
    ChembioPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
