import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ResolvedProfile } from '../profile/resolved-profile.model';

import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolverGuard implements Resolve<any> {
  constructor(private usersService: UsersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ResolvedProfile> {
    return this.usersService.getProfile();
  }
}
