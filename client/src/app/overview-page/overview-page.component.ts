import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Observable} from "rxjs"


import {AnalyticsService} from "../shared/services/analytics.service"
import {OverviewPage} from "../shared/interfaces"
import {MaterialInstance, MaterialService} from "../shared/classs/material.service"


@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget') tapTargetRef!: ElementRef
  tapTarget!: MaterialInstance
  data$!: Observable<OverviewPage>

  yesterday: Date = new Date()

  constructor(private service: AnalyticsService) {
  }

  ngOnInit(): void {
    this.data$ = this.service.getOverview()
    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }


  ngOnDestroy(): void {
    if (this.data$) {
      // this.data$.unsubscribe()
    }
    // @ts-ignore
    this.tapTarget.destroy()
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

  openInfo() {
    // @ts-ignore
    this.tapTarget.open()
  }
}
