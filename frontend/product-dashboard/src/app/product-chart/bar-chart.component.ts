import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import type { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { CommonModule } from '@angular/common';

export interface BarChartItem {
  name: string;
  value: number;
}

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges {
  @Input({ required: true }) data: BarChartItem[] = [];
  @Input() title = 'Bar Chart';
  @Input() yAxisLabel = 'Value';
  @Input() barColor = '#42A5F5';

  options: EChartsCoreOption = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    const xAxisData = this.data.map(d => d.name);
    const values = this.data.map(d => d.value);

    this.options = {
      title: {
        text: this.title,
        left: 'center',
        textStyle: { fontSize: 16 }
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: { rotate: 30 }
      },
      yAxis: {
        type: 'value',
        name: this.yAxisLabel
      },
      series: [
        {
          type: 'bar',
          name: this.yAxisLabel,
          data: values,
          itemStyle: { color: this.barColor },
          animationDelay: (idx:number) => idx * 10
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx:number) => idx * 5
    };
  }
}