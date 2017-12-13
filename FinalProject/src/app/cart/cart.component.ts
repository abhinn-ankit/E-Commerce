import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../services/userAccount.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

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
  public products: [Product];

  constructor(private productService:ProductService) {}

  ngOnInit() {
    
    this.cart = JSON.parse(localStorage.getItem('user')).cart;  
    console.log(this.cart);
    // this.cart.forEach(function(item, index){
    //   this.productService
    //       .getProduct(item.productId)
    //       .subscribe(product => this.products.push(product))     
    // })
  }

}
