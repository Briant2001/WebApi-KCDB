import { Component, Input, OnInit } from '@angular/core';
import { CMCByArea } from '../../interfaces/graficas.interface';

@Component({
  selector: 'app-grafica-kcbd',
  templateUrl: './grafica-kcbd.component.html',
  styles: ``
})
export class GraficaKcbdComponent implements OnInit{

  private resizeListener?: () => void;
  public columnChartOptions: any;

  @Input() datos:CMCByArea[]=[]
  @Input() nombreGraf:string="";
  @Input() title:string="";

  ngOnInit() {

    this.columnChartOptions = {

      title:this.title,
      width: '90%',
      height:'90%',
      legend: { position: 'none' },
      chartArea: {
        left: '10%',   // Margen izquierdo
        top: '10%',    // Margen superior
        bottom:"10%",
        width: '100%',  // Ancho del área del gráfico
        height: '100%'  // Alto del área del gráfico
      },
      bar:{
        groupWidth:70,
      },
      vAxis: {
        title: 'Porcentaje'
      }
    };
    this.loadChart()
  }

  constructor(){
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.resizeListener = this.onResize.bind(this);
      window.addEventListener('resize', this.resizeListener);
    });
  }

  loadChart() {

    google.charts.load('current', { packages: ['corechart'] });

    const dataPie: [any[]] = [['Task', 'Porcentaje', { role: 'annotation' }]];
    this.datos.forEach(element => {

      dataPie.push([element.title,element.count,element.count])
    })

    google.charts.setOnLoadCallback(() => {
      const data = google.visualization.arrayToDataTable(dataPie);
      const chart = new google.visualization.ColumnChart(document.getElementById(this.nombreGraf)!);
      chart.draw(data, this.columnChartOptions);
    });
  }

  onResize() {
    this.loadChart(); // Redibuja el gráfico al cambiar el tamaño
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener!);
  }
}
