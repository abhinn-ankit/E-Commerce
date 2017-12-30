import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product';
import {UserAccountService} from '../services/userAccount.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  total: number;
  products: Product[] = [];
  constructor(private productService: ProductService,
              private userAccountService: UserAccountService) {
  }

  onDelete(cart) {
    this.userAccountService.getCurrentUser();
    this.userAccountService.deleteCart(cart)
      .subscribe(
        data => {
          console.log(data);
          this.userAccountService.deleteCartItem(data.obj);
          this.userAccountService.cart = [];
          this.products = [];
          this.userAccountService.populateProducts(this.products);
        },
        error => console.error(error)
      );
  }

  ngOnInit() {
    this.userAccountService.cart = [];
    this.userAccountService.getCurrentUser()
      .subscribe(
        () => {
          this.userAccountService.populateProducts(this.products);
        }
      );
  }
}
