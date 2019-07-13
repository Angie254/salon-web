import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//system user categories
   usercats = [
    'Administrator',
    'Client',
    'Technician',
    'Staff'
  ];

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  adminUrl: string;
  clientUrl: string;
  technicianUrl: string;
  staffUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      category: [this.usercats, Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.adminUrl = this.route.snapshot.queryParams['returnUrl'] || '/administrator';
    this.clientUrl = this.route.snapshot.queryParams['returnUrl'] || '/client';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value, this.f.category.value)
      .pipe(first())
      .subscribe(
        data => {
            this.loading = false;
          if (data.ok === 'true') {
            if (data.category === 'Administrator' ) {
              this.router.navigate([this.adminUrl]);
            } else if (data.category === 'Client' ) {
              this.router.navigate([this.clientUrl]);
            } else if (data.category === 'Technician' ) {
              this.router.navigate([this.technicianUrl]);
            } else if (data.category === 'Staff' ) {
              this.router.navigate([this.staffUrl]);
            }
          } else {
            this.alertService.warning(data.error);
          }
        },
        error => {
          this.alertService.danger(error);
          this.loading = false;
        });
  }
}
