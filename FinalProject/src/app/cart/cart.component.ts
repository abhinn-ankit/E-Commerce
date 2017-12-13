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

  products: Product[]=[];

  constructor(private productService: ProductService, private authService:UserAccountService) {}

  ngOnInit() {
    this.authService.getCurrentUser();
    // this.authService.user.cart.forEach(function(item){
    //   this.productService
    //       .getProduct(item.productId)
    //       .subscribe(product => this.products.push(product))     
    // });
    console.log(this.authService.user);
    this.productService
          .getProducts()
          .subscribe(products => {
            for(let j=0;j<this.authService.user.cart.length;j++){
              for(let i=0;i<products.length;i++){
                // console.log(products[i].productId,this.authService.user.cart[j].productId);
                if(products[i]._id===this.authService.user.cart[j].productId) {
                  this.products.push(products[i])
                  // console.log(products[i]);
                }
              }  
            }
          })
    
  }
  
}
