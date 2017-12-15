import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../services/userAccount.service';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders-component',
  templateUrl: './orders-component.component.html',
  styleUrls: ['./orders-component.component.scss']
})
export class OrdersComponentComponent implements OnInit {
  orderList: Order[] = [];
  orderPrice: number[] = [];
  constructor(private datePipe: DatePipe,
              private userAccountService: UserAccountService,
              private orderService: OrderService,
              private productService: ProductService) { }

  ngOnInit() {
    this.userAccountService.getCurrentUser();
    this.populateOrders();
    console.log(this.userAccountService.user.orderList[0]);            
  }

  populateOrders(){
    let j=0;    
    for(const o of this.userAccountService.user.orderList){
      this.orderService.getOrder(o)
          .subscribe(order => {
            console.log(order);            
            this.orderList.push(order);
            this.orderPrice[j]=0;
            console.log(this.orderPrice[j]);
            // for(let i=0;i<order.productList.length;i++){
            //   this.productService.getProduct(order.productList[i].productId)
            //       .subscribe(product => {
            //         this.orderPrice[j]+=product.itemList.price.s*order.productList[i].qty;
            //         console.log(j);
            //         console.log(product.itemList.price.s*order.productList[i].qty);   
            //         console.log(this.orderPrice[j]);                                                                                                                          
            //       })
            // }
            j++;
          })
    }
  }
}
