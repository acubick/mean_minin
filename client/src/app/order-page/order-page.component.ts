import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {NavigationEnd, Router} from "@angular/router"

import {MaterialInstance, MaterialService} from "../shared/classs/material.service"
import {OrderService} from "./order.service"
import {OrderPosition} from "../shared/interfaces"

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef!: ElementRef
  modal!:MaterialInstance
  isRoot!: boolean

  constructor(private router: Router,
              public order: OrderService) {
  }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {

      //** Смотрим имена event событий
      // console.log(event.constructor.name, event)

      if(event instanceof NavigationEnd){
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {

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
  }

  removePosition(orderPosition: OrderPosition)  {
     this.order.remove(orderPosition)
  }
}
