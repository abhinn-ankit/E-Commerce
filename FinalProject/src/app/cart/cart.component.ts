import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../services/userAccount.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart: [{
    size: string,
    qty: number,
    productId: string
  }];
  total = 0;
  selectedQty: number;
  products: Product[]= [];

  constructor(private productService: ProductService, private userAccountService: UserAccountService) {}

  // calculate(){
    
  // }
  ngOnInit() {
    this.userAccountService.getCurrentUser();
    this.cart = this.userAccountService.user.cart;
    for (let i = 0; i < this.cart.length; i++) {
      this.productService
          .getProduct(this.cart[i].productId)
          .subscribe(product => {
            console.log(product.itemList.color[0].url);
            this.products.push(product);
          });     
    }
  

  }
}
