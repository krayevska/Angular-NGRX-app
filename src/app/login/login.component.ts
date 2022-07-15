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
import { User } from '../interfaces';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DataService } from '../data.service';
import { setAssestments, setCurrentUser } from '../state/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  email: AbstractControl;
  password: AbstractControl;
  hide = true;

  user$: Observable<User[]>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store<{ user: User[] }>,
    private dataService: DataService
  ) {
    this.user$ = store.select('user');
  }

  ngOnInit() {
    console.log('ON INIT LOGIN');
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.email = this.loginForm.get('email');
    this.password = this.loginForm.get('password');
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService
      .login(this.form.email.value, this.form.password.value)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.router.navigate(['']);
        },
        (error) => {
          console.log('ERROR ', error.message);
        }
      );
  }

  // getAssestments(): void {
  //   this.dataService.getUserAssessments().subscribe((assessments) => {
  //     console.log('assessments ', assessments);
  //     this.store.dispatch(setAssestments({ assessments }));
  //     this.user$.subscribe(data => {
  //       console.log("DATADATA ", data)
  //     })
  //     this.router.navigate(['']);
  //   });
  // }

  getErrorMessage(): void {
    console.log('ERROR');
  }
}
