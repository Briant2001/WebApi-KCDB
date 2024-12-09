import { Component, OnInit } from '@angular/core';
import { ComparisonsService } from '../../services/comparisons.service';
import { CMCByArea } from '../../interfaces/graficas.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit{

  constructor(private comparison:ComparisonsService){}
  public graficaCMCByArea?:CMCByArea[];
  public graficaCMCByArea2?:CMCByArea[];
  ngOnInit(): void {
    this.comparison.getGrafica().subscribe(
      result=>{
        this.graficaCMCByArea =  result
      }
    )

    this.comparison.getGrafica2().subscribe(
      result=>{
        this.graficaCMCByArea2 =  result
      }
    )
  }



}
