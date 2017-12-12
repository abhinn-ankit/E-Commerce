import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {UserAccountService} from './userAccount.service';

@Injectable()
export class AuthService implements CanActivate {
  constructor(private service: UserAccountService) {
  }

  canActivate() {
    return localStorage.getItem('token') !== null;
  }
}
