import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { MetrologyAreaPagesComponent } from './pages/cmcs/domain-physics/domains-physics.pages.component';
import { FormsModule } from '@angular/forms';
import { ModalServiceComponent } from './components/modal-service/modal-service.component';
import { DomainsPagesComponent } from './pages/cmcs/domains-pages/domains-pages.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DomainCHEMBIOComponent } from './pages/cmcs/domain-chembio/domain-chembio.component';
import { ModalServiceCheComponent } from './components/modal-service-che/modal-service-che.component';
import { DomainsRadiationComponent } from './pages/cmcs/domains-radiation/domains-radiation.component';
import { CambiarLenguajePipe } from './pipes/cambiar-espanol.pipe';
import { ModalServiceRadiationComponent } from './components/modal-service-radiation/modal-service-radiation.component';
import { EstatusPipe } from './pipes/status.pipe';
import { TotalServicePipe } from './pipes/total-servicios.pipe';
import { ChembioPipe } from './pipes/total-servicios-chembio.pipe';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutCMCSComponent } from './pages/cmcs/layout/layout.component';
import { LayoutComparisonsComponent } from './pages/comparison/layout-comparisons/layout-comparisons.component';
import { MetrologyAreaPageComponent } from './pages/comparison/metrology-area-page/metrology-area-page.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { GraficaKcbdComponent } from './components/grafica-kcbd/grafica-kcbd.component';

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
    ChembioPipe,
    LayoutComponent,
    HomeComponent,
    LayoutCMCSComponent,
    LayoutComparisonsComponent,
    MetrologyAreaPageComponent,
    GraficaKcbdComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    GoogleChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
