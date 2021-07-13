import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {NavigationEnd, Router} from "@angular/router"
import {Subscription} from "rxjs"

import {MaterialInstance, MaterialService} from "../shared/classs/material.service"
import {OrderService} from "./order.service"
import {Order, OrderPosition} from "../shared/interfaces"
import {OrdersService} from "../shared/services/orders.service"

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef!: ElementRef
  modal!: MaterialInstance
  oSub!: Subscription
  isRoot!: boolean
  pending = false

  constructor(private router: Router,
              public order: OrderService,
              private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {

      //** Смотрим имена event событий
      // console.log(event.constructor.name, event)

      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
     if(this.oSub){
        this.oSub.unsubscribe()
     }
    // @ts-ignore
    this.modal.destroy()
  }


  open() {
    // @ts-ignore
    this.modal.open()
  }

  cancel() {
    // @ts-ignore
    this.modal.close()
  }

  submit() {
    // @ts-ignore
    this.modal.close()

    this.pending = true

    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id
        return item
      })
    }

    // @ts-ignore
   this.oSub = this.ordersService.create(order)
      .subscribe(newOrder => {
          MaterialService.toast(`Заказ №${newOrder.order} был добавлен.`)
          this.order.clear()
        },
        error => MaterialService.toast(error.error.message),
        () => {
          // @ts-ignore
          this.modal.close()
          this.pending = false
        }
      )
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }
}
