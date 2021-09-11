import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ResolverGuard implements Resolve<any> {
  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.usersService.getResume(route.paramMap.get('username'));
  }
}
