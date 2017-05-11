import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if(!this.authService.isAuthenticated) {
      this.router.navigate(['/login'])
      return false
    }

    return true      
  }

}