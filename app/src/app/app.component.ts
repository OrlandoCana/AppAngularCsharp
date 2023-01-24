import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthApiService } from './services/auth-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  user: User;

  constructor(
    public authApiService: AuthApiService,
    private router: Router
  ) {
    this.authApiService.user.subscribe(res => {
      this.user = res;
    });
  }

  logout() {
    this.authApiService.logout();
    this.router.navigate(['/login'])
  }
}
