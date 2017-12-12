import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UserAccount} from '../models/userAccount';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CartModel} from '../models/cart';

@Injectable()
export class UserAccountService {
  user: UserAccount;
  cart: CartModel[];
  constructor(private http: HttpClient) {
  }

  url = 'http://localhost:3000/user';

  signUp(user: UserAccount) {
    const body = JSON.stringify(user);
    console.log(body);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url, body, {headers: headers})
      .map( result => {
        console.log(result);
        return user;
      })
      .catch(error => Observable.throw(error.error));
  }

  signIn(user: UserAccount) {
    const body = JSON.stringify(user);
    const signin = '/signin';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.url}${signin}`, body, {headers: headers})
      .catch(error => Observable.throw(error.error));
  }

  logOut() {
    localStorage.clear();
  }

  isLoggedIn() {
    this.user = JSON.parse(localStorage.getItem('user'));
    return localStorage.getItem('token') !== null;
  }

  addProductToCart(cart: CartModel) {
    const body = JSON.stringify(cart);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.patch<CartResponse>('http://localhost:3000/user/cart/' + token, body, {headers: headers})
      .map((result) => {
        console.log(this.user);
        return result.obj;
        // const msg =  new Message(
        //   result.obj.content,
        //   result.obj.user.firstName,
        //   result.obj._id,
        //   result.obj.user._id);
        // this.messages.push(msg);
        // return msg;
      })
      .catch(error => {
        console.log(error.error);
        return Observable.throw(error.error);
      });
  }
}

interface CartResponse {
  message: string;
  obj: Array<CartModel>;
}
