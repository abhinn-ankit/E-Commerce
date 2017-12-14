import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  orderID:number;
  products: Product[];

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) => params.getAll('orderID'))
    .subscribe(orderID => {
      console.log(orderID);
      this.orderID = +orderID;
      this.orderService.getOrder(orderID)
      .subscribe(order => {
        for(let i=0;i<order.productList.length;i++){
          this.productService.getProduct(order.productList[i].productId)
              .subscribe(product => {
                this.products.push(product);
              })
        }
      })
    })
  }

}
