import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core'

import {Filter} from "../../shared/interfaces"
import {MaterialDatepicker, MaterialService} from "../../shared/classs/material.service"


@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>()
  @ViewChild('start') startRef!: ElementRef
  @ViewChild('end') endRef!: ElementRef

  start!: MaterialDatepicker
  end!: MaterialDatepicker

  isValid = true

  order!: number

  constructor() {
  }

  ngOnInit(): void {
  }

  submitFilter() {
    const filter: Filter = {}

    if (this.order) {
      filter.order = this.order
    }
    if(this.start.date){
      filter.start = this.start.date
    }
    if(this.end.date){
      filter.end = this.end.date
    }
    this.onFilter.emit(filter)

  }

  ngAfterViewInit(): void {
    this.start = MaterialService.initDatePicker(this.startRef, this.validate.bind(this))
    this.end = MaterialService.initDatePicker(this.endRef, this.validate.bind(this))
  }

  validate() {
    // debugger
    if (!this.start.date || !this.end.date) {
      this.isValid = true
      return
    }
    this.isValid = this.start.date < this.end.date
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.start.destroy()
    // @ts-ignore
    this.end.destroy()
  }
}
