import {Component, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import * as moment from 'moment';

@Component({
  selector: 'app-item-component',
  templateUrl: './item-component.component.html',
  styleUrls: ['./item-component.component.scss']
})
export class ItemComponentComponent implements OnInit {

  products: Product[] = [];
  type: string;
  filter: string;
  searchName: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
  }

  search(selected: string[]) {
    this.products = [];
    this.productService
      .getProducts()
      .subscribe(products => {
        // &&selected.findIndex(value => (value === 'a')||(value === 'z')||(value === 'low')||(value === 'high')) == -1
        // noinspection TsLint
        if (selected.length === 0 || (selected.length === 1 && selected.findIndex(value => (value === 'a') || (value === 'z') || (value === 'low') || (value === 'high')) != -1)) {
          this.products = products;
        } else {
          // console.log('Enter');
          for (let i = 0; i < selected.length; i++) {
            for (let j = 0; j < products.length; j++) {
              if (products[j].rating === +selected[i]) {
                this.products.push(products[j]);
              }
            }
          }
        }

        // noinspection TsLint
        if (selected.findIndex(value => value === ('a')) != -1) {
          this.products = this.products.sort(this.sortNameA);
        }
        // noinspection TsLint
        if (selected.findIndex(value => value === ('z')) != -1) {
          this.products = this.products.sort(this.sortNameB);
        }
        // noinspection TsLint
        if (selected.findIndex(value => value === ('low')) != -1) {
          this.products = this.products.sort(this.sortPriceA);
          for (let i = 0; i < this.products.length; i++) {
            console.log(this.products[i].itemList.price.s);
          }
        }

        if (selected.findIndex(value => value === ('high')) != -1) {
          this.products = this.products.sort(this.sortPriceB);
        }

      });
  }

  sortNameA(a, b) {
    // console.log(a.name.toLowerCase().charAt(0));
    const na = a.name.toLowerCase().charAt(0);
    const nb = b.name.toLowerCase().charAt(0);

    if (na < nb)
      return -1;
    else if (na > nb)
      return 1;
    else return 0;
  }

  sortNameB(a, b) {
    const na = a.name.toLowerCase().charAt(0);
    const nb = b.name.toLowerCase().charAt(0);

    if (na > nb)
      return -1;
    else if (na < nb)
      return 1;
    else return 0;
  }

  sortPriceA(a, b) {
    const na = a.itemList.price.s;
    const nb = b.itemList.price.s;
    // noinspection TsLint
    if (na < nb)
      return -1;
    else if (na > nb)
      return 1;
    else return 0;
  }

  sortPriceB(a, b) {
    const na = a.itemList.price.s;
    const nb = b.itemList.price.s;
    if (na > nb)
      return -1;
    else if (na < nb)
      return 1;
    else return 0;
  }

  ngOnInit(): void {
    // this.type = this.route.snapshot.params["productType"]
    // console.log(this.type);
    this.route.queryParams.subscribe(params => {
      this.searchName = params['name'];
      this.productService
        .getProducts()
        .subscribe(products => {
          if (this.searchName !== undefined) {
            this.products = [];
            for (let i = 0; i < products.length; i++) {
              // noinspection TsLint
              if (products[i].name.toLowerCase().includes(this.searchName.toLowerCase()))
                this.products.push(products[i]);
            }
          }
        });
    });

    this.route.paramMap
      .switchMap((params: ParamMap) => params.getAll('productType'))
      .subscribe(productType => {
        this.type = productType;
        console.log(this.type);
        this.productService
          .getProducts()
          .subscribe(products => {
            if (this.type !== undefined) {
              this.products = [];
              if (this.type === 't-shirts') {
                for (let i = 0; i < products.length; i++) {
                  // noinspection TsLint
                  if (products[i].type === 't-shirt')
                    this.products.push(products[i]);
                }
              } else if (this.type === 'dresses') {
                for (let i = 0; i < products.length; i++) {
                  // noinspection TsLint
                  if (products[i].type === 'dresses')
                    this.products.push(products[i]);
                }
              } else if (this.type === 'jackets') {
                for (let i = 0; i < products.length; i++) {
                  // noinspection TsLint
                  if (products[i].type === 'jackets')
                    this.products.push(products[i]);
                }
              }
              // console.log(this.products)
            }
          });
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => params.getAll('filterType'))
      .subscribe(filterType => {
        this.filter = filterType;
        console.log(this.filter);
        this.productService
          .getProducts()
          .subscribe(products => {
            if (this.filter === 'bestsellers') {
              this.products = [];
              for (let i = 0; i < products.length; i++) {
                // console.log(products[i].rating)
                // noinspection TsLint
                if (products[i].rating === 5)
                  this.products.push(products[i]);
              }
            }
            if (this.filter === 'newarrivals') {
              this.products = [];
              const currentTime = '2017-12-30';
              for (let i = 0; i < products.length; i++) {
                // console.log(products[i].rating)
                if (moment(products[i].addedTime).isAfter(currentTime, 'day') !== true) { // false
                  this.products.push(products[i]);
                }
              }
            }
          });
      });
    // noinspection TsLint
    if (this.type === undefined && this.filter === undefined)
      this.productService
        .getProducts()
        .subscribe(products => {
          this.products = products;
        });
  }
}
