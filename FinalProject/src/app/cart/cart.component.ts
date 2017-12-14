import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product';
import {CartModel} from '../models/cart';
import {UserAccountService} from '../services/userAccount.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  total: number;
  products: Product[] = [];
  constructor(private productService: ProductService, private userAccountService: UserAccountService) {
  }

  ngOnInit() {
    this.userAccountService.cart = [];
    this.userAccountService.getCurrentUser();
    this.userAccountService.populateProducts(this.products);
  }
}
