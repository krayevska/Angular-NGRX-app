import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CurrentUser } from '../interfaces';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DataService } from '../data.service';
import { setAssestments, getCurrentUser } from '../state/user.actions';
import { currentUserSelector } from '../state/selectors';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  email: AbstractControl;
  password: AbstractControl;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.email = this.loginForm.get('email');
    this.password = this.loginForm.get('password');

    this.store.select(currentUserSelector).subscribe((user) => {
      if (user) {
        this.router.navigate(['']);
      }
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    let email = this.form.email.value;
    let password = this.form.password.value;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.store.dispatch({
      type: '[Login Component] Get current User',
      payload: { email, password },
    });
  }
}
