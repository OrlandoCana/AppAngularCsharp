import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    public apiAuth: AuthApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    /*if (this.apiAuth.userData) {
      this.router.navigate(['/']);
    }*/
  }

  ngOnInit(): void {
  }

  login() {
    this.apiAuth.login(this.loginForm.value).subscribe(response => {
      if (response.success === "1") {
        this.router.navigate(['/'])
      }
    })
  }

}
