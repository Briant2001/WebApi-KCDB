import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomainsPagesComponent } from './pages/domains-pages/domains-pages.component';
import { MetrologyAreaPagesComponent } from './pages/domain-physics/domains-physics.pages.component';
import { DomainCHEMBIOComponent } from './pages/domain-chembio/domain-chembio.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DomainsRadiationComponent } from './pages/domains-radiation/domains-radiation.component';

const routes:Routes = [

  {
    path:"kcdb",
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
