import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {ActivatedRoute, Params, Router} from "@angular/router"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {switchMap} from "rxjs/operators"
import {of} from "rxjs"

import {CategoriesService} from "../../shared/services/categories.service"
import {MaterialService} from "../../shared/classs/material.service"
import {Category} from "../../shared/interfaces"

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  // @ts-ignore
  @ViewChild('input') inputRef: ElementRef

  // @ts-ignore
  form: FormGroup

  image: File | undefined
  imagePreview: string | ArrayBuffer | null | undefined
  isNew = true

  category!: Category
  id: string = ''

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private  router: Router) {
  }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    })

    // Старый подхоод
    // this.route.params.subscribe((params: Params) => {
    //   if (params['id']) {
    //     // Мы редактируем форму
    //     this.isNew = false
    //   }
    // })

    this.form.disable()


    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.id = params['id']
              this.isNew = false
              return this.categoriesService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        category => {
          if (category) {
            this.category = category
            // console.log(this.category)
            this.form.patchValue({
              name: category.name,
            })
            this.imagePreview = category.imageSrc
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        error => MaterialService.toast(error.error.message)
      )


  }

  onSubmit() {
    let obs$
    this.form.disable()
    if (this.isNew) {
      //create
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      // update
      // @ts-ignore
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)
    }
    obs$.subscribe(
      category => {
        this.category = category
        MaterialService.toast('Изменения сохранены')
        this.form.enable()
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      })
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload($event: any) {
    const file = $event.target.files[0]
    this.image = file

    const reader = new FileReader()
    reader.onloadend = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  deleteCategory() {
    // @ts-ignore
    const decision = window.confirm(`Вы уверены что хотите удалить категорию ${this.category.name}?`)

    if (decision) {
      // @ts-ignore
      this.categoriesService.delete(this.category._id)
        .subscribe(
          (response: { message: string }) => MaterialService.toast(response.message),
          (error: { error: { message: string } }) => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/categories'])
        )
    }
  }
}
