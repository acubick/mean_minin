import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {MaterialInstance, MaterialService} from "../shared/classs/material.service"

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit  {

  @ViewChild('tooltip') tooltipRef!: ElementRef
  tooltip!: MaterialInstance

  isFilterVisible = false


  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy(): void {
    if(this.tooltip){
      // @ts-ignore
      this.tooltip.destroy()
    }
  }

}
