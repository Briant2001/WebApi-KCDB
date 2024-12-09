import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomainsPagesComponent } from './pages/cmcs/domains-pages/domains-pages.component';
import { MetrologyAreaPagesComponent } from './pages/cmcs/domain-physics/domains-physics.pages.component';
import { DomainCHEMBIOComponent } from './pages/cmcs/domain-chembio/domain-chembio.component';
import { DomainsRadiationComponent } from './pages/cmcs/domains-radiation/domains-radiation.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutCMCSComponent } from './pages/cmcs/layout/layout.component';
import { LayoutComparisonsComponent } from './pages/comparison/layout-comparisons/layout-comparisons.component';
import { MetrologyAreaPageComponent } from './pages/comparison/metrology-area-page/metrology-area-page.component';

const routes:Routes = [

  {
    path:"kcdb",
    component:LayoutComponent,
    children:[
      {
        path:"home",
        component:HomeComponent
      },
      {
        path:"CMCS",
        component:LayoutCMCSComponent,
        children:[
          {
            path:"domains",
            component:DomainsPagesComponent
          },
          {
            path:"metrologyArea/physics/:id",
            component:MetrologyAreaPagesComponent
          },
          {
            path:"metrologyArea/chem-bio/:id",
            component:DomainCHEMBIOComponent
          },
          {
            path:"metrologyArea/radiation/:id",
            component:DomainsRadiationComponent
          },
          {
            path:"**",
            redirectTo:"domains"
          }
        ]
      },
      {
        path:"comparisons",
        component:LayoutComparisonsComponent,
        children:[
          {
            path:"busqueda-avanzada",
            component:MetrologyAreaPageComponent
          },
          {
            path:"**",
            redirectTo:"busqueda-avanzada"
          }
        ]
      },
      {
        path:"**",
        redirectTo:"home"
      }
    ]
  },
  {
    path:"**",
    redirectTo:"kcdb"
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
