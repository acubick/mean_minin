import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {PositionsService} from "../../../shared/services/positions.service"
import {Position} from '../../../shared/interfaces'
import {MaterialInstance, MaterialService} from "../../../shared/classs/material.service"

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {


  @Input('categoryId') categoryId: string | undefined
  // @ts-ignore
  @ViewChild('modal') modalRef: ElementRef
  positions: Position[] = []
  loading = false
  modal: MaterialInstance | undefined

  constructor(private positionsService: PositionsService) {

  }

  ngOnInit(): void {
    this.loading = true
    // debugger
    // console.log(this.categoryId)
    if (this.categoryId) {
      this.positionsService.fetch(this.categoryId).subscribe(positions => {
        this.positions = positions

      })

    }
    this.loading = false

  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {

    // @ts-ignore
    this.modal.destroy()

  }

  onSelectPosition(position: Position) {
    // @ts-ignore
    this.modal.open()

  }

  onAddPosition() {
    // @ts-ignore
    this.modal.open()
  }

  onCancel() {
    // @ts-ignore
    this.modal.close()
  }
}
