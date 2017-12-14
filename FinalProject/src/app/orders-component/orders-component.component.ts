import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../services/userAccount.service';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-orders-component',
  templateUrl: './orders-component.component.html',
  styleUrls: ['./orders-component.component.scss']
})
export class OrdersComponentComponent implements OnInit {

  orderList: Order[] = [];
  orderPrice: number[] = [];
  total: 0;
  constructor(private userAccountService: UserAccountService,
              private orderService: OrderService,
              private productService: ProductService) { }

  ngOnInit() {
    this.userAccountService.getCurrentUser();
    // console.log(this.userAccountService.user.);
    this.populateOrders();
  }

  populateOrders(){
    for(const o of this.userAccountService.user.orderList){
      this.orderService.getOrder(o)
          .subscribe(order => {
            this.orderList.push(order);
            this.total=0;
            for(let i=0;i<order.productList.length;i++){
              this.productService.getProduct(order.productList[i].productId)
                  .subscribe(product => {
                    this.total+=product.itemList[0].price.s*order.productList[i].qty;
                  })
            }
            this.orderPrice.push(this.total);
          })
    }
  }
}
