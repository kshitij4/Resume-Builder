import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class UsersGuard implements CanActivate {
  constructor(private userServices: UsersService, private router: Router) {}

  canActivate(): boolean {
    if (this.userServices.isLogged()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
