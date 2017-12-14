import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UserAccount} from '../models/userAccount';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CartModel} from '../models/cart';
import {ProductService} from './product.service';
import {Product} from '../models/product';

@Injectable()
export class UserAccountService {
  user: UserAccount;
  cart: CartModel[] = [];
  userId: string;
  constructor(private http: HttpClient, private productService: ProductService) {
  }

  url = 'http://localhost:3000/user';

  signUp(user: UserAccount) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url, body, {headers: headers})
      .map(result => {
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
    return localStorage.getItem('token') !== null;
  }

  addProductToCart(cart) {
    const body = JSON.stringify(cart);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.patch<CartResponse>(`${this.url}/cart/a` + token, body, {headers: headers})
      .map(result => {
        console.log(result);
        console.log(this.user);
        return result;
      })
      .catch(error => {
        console.error(error.error);
        return Observable.throw(error.error);
      });
  }

  getCurrentUser() {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get<UserResponse>(`${this.url}/getUser` + token)
      .map(data => {
        localStorage.setItem('user', JSON.stringify(data.obj));
        this.user = data.obj;
        this.userId = data.userId;
      })
      .catch(error => {
        console.error(error.error);
        return Observable.throw(error.error);
      });
  }

  updateCart(cart) {
    console.log(this.user['cart']);
    let differentProduct = true;
    if (this.user['cart'].length >= 0) {
      this.user.cart.forEach(function (c) {
        // noinspection TsLint
        if (cart.productId == c.productId && cart.size == c.size && differentProduct) {
          c.qty = cart.qty;
          console.log('It should return');
          differentProduct = false;
          return;
        }
      });
    }
    console.log(this.user);
    // noinspection TsLint
    if (differentProduct)
      this.user.cart.push(cart);
  }

  populateProducts(products: Product[]) {
    for (const c of this.user.cart) {
      this.productService.getProduct(c.productId)
        .subscribe(product => {
          products.push(product);
          this.cart.push(c);
        });
    }
  }

}


interface UserResponse {
  message: string;
  obj: UserAccount;
  userId: string;
}

interface CartResponse {
  message: string;
  obj: {
    size: string,
    qty: string,
    productId: string
  };
}
