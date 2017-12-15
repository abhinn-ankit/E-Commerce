import {Injectable} from '@angular/core';
import {UserAccountService} from './userAccount.service';
import {Order} from '../models/order';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Product} from '../models/product';

@Injectable()
export class OrderService {
  order: Order;
  orderId: number;

  constructor(private userAccountService: UserAccountService, private http: HttpClient) {
  }

  placeOrder(order: Order) {
    const body = JSON.stringify(order);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.post(`${this.userAccountService.url}/order/pl` + token, body, {headers: headers})
      .map(result => {
        console.log(result);
        return result;
      })
      .catch(error => Observable.throw(error.error));
  }

  getOrder(id: string) {
    const orderUrl = '/order/';
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const url = `${this.userAccountService.url}${orderUrl}${id}${token}`;
    return this.http.get<OrderRes>(url)
      .map(response => {
        this.orderId = response.orderId;
        return response.obj;
      })
      .catch((error) => Observable.throw(error.error));
  }
}

interface OrderRes {
  message: string;
  obj: Order;
  orderId: number;
}
