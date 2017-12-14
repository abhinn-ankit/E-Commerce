import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';


import {Observable} from 'rxjs/Rx';
import { Order } from '../models/order';

@Injectable()
export class OrderService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private ordersUrl = 'http://localhost:3000/orderss';  // URL to web api

  constructor(private http: HttpClient) {
  }

  getOrder(id: number) {
    const url = `${this.ordersUrl}/${id}`;
    // console.log(url);
    return this.http.get<OrderResponse>(url)
      .map(response => {
        return response.obj as Order;
      })
      .catch((error) => Observable.throw(error));
  }

}

interface OrderResponse {
  message: string;
  obj: Order;
}