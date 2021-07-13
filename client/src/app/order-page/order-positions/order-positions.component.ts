import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params} from "@angular/router"
import {Observable} from "rxjs"
import {map, switchMap} from "rxjs/operators"

import {Position} from "../../shared/interfaces"
import {PositionsService} from "../../shared/services/positions.service"
import {OrderService} from "../order.service"
import {MaterialService} from "../../shared/classs/material.service"


@Component({
  selector: 'app-ordeer-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {

  positions$!: Observable<Position[]>

  constructor(private route: ActivatedRoute,
              private positionsService: PositionsService,
              private order: OrderService) {
  }

  ngOnInit(): void {
    this.positions$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionsService.fetch(params['id'])
          }
        ),
        map(
          (positions: Position[]) => {
            return positions.map(position => {
              position.quantity = 1
              return position
            })
          }
        )
      )
  }

  addToOrder(position: Position) {
    // console.log(position, `position`)
    MaterialService.toast(`Добавлено: x ${position.quantity} - ${position.name}`)
    this.order.add(position)
  }
}
