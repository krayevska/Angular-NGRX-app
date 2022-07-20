import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { errorSelector, loadingtSelector } from '../../state/selectors';
import { AppState } from '../../state/app.state';
import * as actions from 'src/app/state/user.actions';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  hide = true;

  loading$: Observable<boolean> = this.store.select(loadingtSelector);
  loginError$: Observable<boolean> = this.store.select(errorSelector);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    const email = this.form.email.value;
    const password = this.form.password.value;
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(actions.getCurrentUser({ email, password }));
  }
}
