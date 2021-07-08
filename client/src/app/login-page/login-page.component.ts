import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {Subscription} from "rxjs"
import {ActivatedRoute, Router} from "@angular/router"

import {AuthService} from "../shared/services/auth.service"
import {MaterialService} from "../shared/classs/material.service"

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  // @ts-ignore
  form: FormGroup

  aSub: Subscription = new Subscription


  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute ) {
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    })
    this.route.queryParams.subscribe((params) => {
      if(params['registered']){
        // Теперь вы можете войти в систему используя свои данные
        MaterialService.toast('Теперь вы можете войти в систему используя свои данные')
      }else if(params['accessDenied']){
        // Для начала авторизуйтесь в системе
        MaterialService.toast('Для начала авторизуйтесь в системе')
      }else if(params['sessionFailed']){
        MaterialService.toast('Пожалуйста войдите в систему заново')
      }
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }

  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
