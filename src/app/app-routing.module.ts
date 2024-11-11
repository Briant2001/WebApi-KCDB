import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomainsPagesComponent } from './pages/cmcs/domains-pages/domains-pages.component';
import { MetrologyAreaPagesComponent } from './pages/cmcs/domain-physics/domains-physics.pages.component';
import { DomainCHEMBIOComponent } from './pages/cmcs/domain-chembio/domain-chembio.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DomainsRadiationComponent } from './pages/cmcs/domains-radiation/domains-radiation.component';
import { LayoutComponent } from './layout/layout.component';

const routes:Routes = [

  {
    path:"kcdb",
    component:LayoutComponent,
    children:[
      {
        path:"domains",
        component:DomainsPagesComponent,
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
