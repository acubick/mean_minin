import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core'
import {Subscription} from "rxjs"
import {Chart, registerables} from 'chart.js'

import {AnalyticsService} from "../shared/services/analytics.service"
import {AnalyticsPage} from "../shared/interfaces"

// export interface Config {
//   label: string
//   color: string
//   data?: string
//   labels?: string
// }

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {


  @ViewChild('gain') gainRef!: ElementRef
  @ViewChild('order') orderRef!: ElementRef

  aSub!: Subscription
  average!: number
  pending = true

  constructor(private service: AnalyticsService) {
    Chart.register(...registerables)
  }


  ngAfterViewInit(): void {

    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    }
    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)'
    }

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average

      gainConfig.labels = data.chart.map(item => item.label)
      gainConfig.data = data.chart.map(item => item.gain)

      orderConfig.labels = data.chart.map(item => item.label)
      orderConfig.data = data.chart.map(item => item.order)

      // ************ Gain *****************//
      // gainConfig.labels.push('15.07.2021')
      // gainConfig.data.push(3500)
      // gainConfig.labels.push('16.07.2021')
      // gainConfig.data.push(5500)
      // ************ /Gain *****************//

      // ************ Order *****************//
      // orderConfig.labels.push('15.07.2021')
      // orderConfig.data.push(8)
      // orderConfig.labels.push('16.07.2021')
      // orderConfig.data.push(5)
      // ************ /Order *****************//

      const gainCtx = this.gainRef.nativeElement.getContext('2d')
      gainCtx.canvas.height = '300px'

      const orderCtx = this.orderRef.nativeElement.getContext('2d')
      orderCtx.canvas.height = '300px'

      // @ts-ignore
      new Chart(gainCtx, createChartConfig(gainConfig))
      // @ts-ignore
      new Chart(orderCtx, createChartConfig(orderConfig))

      this.pending = false
    })
  }


  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }


}


// @ts-ignore
function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}
