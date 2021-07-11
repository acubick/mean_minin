import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms"

import {PositionsService} from "../../../shared/services/positions.service"
import {Position} from '../../../shared/interfaces'
import {MaterialInstance, MaterialService} from "../../../shared/classs/material.service"

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {


  @Input('categoryId') categoryId!: string


  // @ts-ignore
  @ViewChild('modal') modalRef: ElementRef
  positions: Position[] = []
  loading = false
  positionId = null
  modal: MaterialInstance | undefined
  // @ts-ignore
  form: FormGroup

  constructor(private positionsService: PositionsService) {

  }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)]),
    })

    // debugger
    // console.log(this.categoryId, 'this.categoryId')
    this.loading = true
    this.positionsService.fetch(this.categoryId).subscribe(positions => {
      // console.log(positions, 'positions')
      this.positions = positions
      this.loading = false
    })


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
    this.positionId = position._id
    this.form.patchValue({
       name: position.name,
      cost: position.cost
    })
    // @ts-ignore
    this.modal.open()
    MaterialService.updateTextInputs()

  }

  onAddPosition() {
    this.positionId = null
    this.form.reset({
      name: null,
      cost: 1
    })
    // @ts-ignore
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onCancel() {
    // @ts-ignore
    this.modal.close()
  }

  onSubmit() {
    this.form.disable()


    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    const  completed = () =>  {
      // @ts-ignore
      this.modal.close()
      // @ts-ignore
      this.form.reset({
        name: '',
        cost: 1
      })
      // @ts-ignore
      this.form.enable()
    }

    if(this.positionId){
        // @ts-ignore
      newPosition._id = this.positionId
      this.positionsService.update(newPosition).subscribe(position => {
        const idx = this.positions.findIndex(p => p._id === position._id)
        this.positions[idx] = position
          MaterialService.toast('Изменения сохранены')
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        completed
      )
    }else {

      this.positionsService.create(newPosition).subscribe(position => {
          MaterialService.toast('Позиция создана')
          this.positions.push(position)
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        completed
      )
    }


  }

  // getClassses(): any {
  //   return {'invalid': this.form.get('name')?.invalid && this.form.get('name')?.touched}
  // }
  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation()
    const decision = window.confirm(`Вы действительно хотите удалить позицию ${position.name}?`)
    if(decision){
            this.positionsService.delete(position).subscribe(
              response => {
                const idx = this.positions.findIndex(p => p._id === position._id)
                this.positions.splice(idx, 1)
                MaterialService.toast(response.message)
              },
              error => MaterialService.toast(error.error.message)
            )
    }
  }
}
