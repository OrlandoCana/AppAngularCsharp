import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authApiService: AuthApiService
    ) {

    }
    canActivate(): boolean {
        const user = this.authApiService.userData;

        if (user) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }

}