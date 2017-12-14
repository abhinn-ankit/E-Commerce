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

  cart: CartModel[] = [];
  public products: Product[] = [];

  constructor(private productService: ProductService, private userAccountService: UserAccountService) {
  }

  ngOnInit() {
    this.userAccountService.getCurrentUser();
    console.log(this.userAccountService.user);
    this.populateProducts();
  }

  populateProducts() {
    for (const c of this.userAccountService.user.cart) {
      this.productService.getProduct(c.productId)
        .subscribe(product => {
          this.products.push(product);
          this.cart.push(c);
        });
    }
    console.log(this.products);
    console.log(this.cart);
  }

}
