import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Product} from '../models/product';

@Injectable()
export class HeroSearchService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private productsUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {
  }

  search(term: string): Observable<Product[]> {
    return this.http.get<ProductsResponse>(this.productsUrl)
      .map(response => {

        return response.obj as Product[];
      })
      .catch((error) => Observable.throw(error));
  }

}

interface ProductsResponse {
  message: string;
  obj: Array<Product>;
}
