import {Injectable} from '@angular/core';
import {UserAccountService} from './userAccount.service';
import {Order} from '../models/order';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OrderService {
  order: Order;
  constructor(private userAccountService: UserAccountService, private http: HttpClient) {}

  placeOrder(order: Order) {
    const body = JSON.stringify(order);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.post(`${this.userAccountService.url}/order/pl` + token, body, {headers: headers})
      .map(result => {
        console.log(result);
      })
      .catch(error => Observable.throw(error.error));
  }

}
