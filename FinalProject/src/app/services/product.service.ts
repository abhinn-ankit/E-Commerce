import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';


import {Product} from '../models/product';
import {Observable} from 'rxjs/Rx';
import {UserAccountService} from "./userAccount.service";

@Injectable()
export class ProductService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private productsUrl = 'http://localhost:3000/products';  // URL to web api

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get<ProductsResponse>(this.productsUrl)
      .map(response => {
        return response.obj as Product[];
      })
      .catch((error) => Observable.throw(error));
  }

  getProduct(id: string) {
    const url = `${this.productsUrl}/${id}`;
    console.log(url);
    return this.http.get<ProductResponse>(url)
      .map(response => {
        return response.obj as Product;
      })
      .catch((error) => Observable.throw(error));
  }

}

interface ProductsResponse {
  message: string;
  obj: Array<Product>;
}

interface ProductResponse {
  message: string;
  obj: Product;
}
