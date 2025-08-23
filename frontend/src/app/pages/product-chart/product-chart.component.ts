import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.scss']
})
export class ProductChartComponent {
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  get barChartData(): ChartConfiguration<'bar'>['data'] {
    return {
      labels: this.labels,
    datasets: [{
  data: this.data,
  label: ' Quantity per Product',
  backgroundColor: '#3f51b5', 
  borderColor: '#3f51b5',
  borderWidth:1,
  
}]

    };
  }

  barChartType: ChartType = 'bar';
}
