import { Component, OnInit } from '@angular/core';
import { ComparisonsService } from '../../../services/comparisons.service';
import { ReferenceDatum } from '../../../interfaces/kcdb.models';

@Component({
  selector: 'app-layout-comparisons',
  templateUrl: './layout-comparisons.component.html',
  styles: ``
})
export class LayoutComparisonsComponent implements OnInit{

  public areas?:ReferenceDatum[]

  constructor(private comparisonsSerivce:ComparisonsService){}


  ngOnInit(): void {

  }



}
