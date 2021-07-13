import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Order} from "../../shared/interfaces"
import {MaterialInstance, MaterialService} from "../../shared/classs/material.service"

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() orders!: Order[]
  @ViewChild('modal')modalRef!: ElementRef

  selectedOrder!: Order
  modal!: MaterialInstance

  constructor() {
  }

  ngOnInit(): void {
  }

  computePrice(order: Order): number {
    return order.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }

  selectOrder(order: Order) {
      this.selectedOrder = order
    // @ts-ignore
    this.modal.open()
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.modal.destroy()
  }

  closeModal() {
    // @ts-ignore
    this.modal.close()
  }
}
