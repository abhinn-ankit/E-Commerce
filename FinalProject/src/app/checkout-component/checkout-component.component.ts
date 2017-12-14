import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ListOfProducts, Order} from '../models/order';
import {UserAccountService} from '../services/userAccount.service';
import {Router} from '@angular/router';
import {OrderService} from '../services/order.service';

@Component({
  selector: 'app-checkout-component',
  templateUrl: './checkout-component.component.html',
  styleUrls: ['./checkout-component.component.scss']
})
export class CheckoutComponentComponent implements OnInit {
  myForm: FormGroup;
  productList: Array<ListOfProducts>;

  onSubmit() {
    this.uas.getCurrentUser();
    const date = new Date();
    const order = new Order(
      this.productList,
      date,
      this.uas.userId,
      this.myForm.value.firstName + ' ' + this.myForm.value.lastName,
      this.myForm.value.state,
      this.myForm.value.zip,
      this.myForm.value.address1,
      this.myForm.value.address2
    );
    this.orderService.order = order;
    this.router.navigateByUrl('/payment');
    this.myForm.reset();
  }

  constructor(private uas: UserAccountService, private router: Router, private orderService: OrderService) {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{3}[ -][0-9]{3}[ -][0-9]{4}')
      ]),
      zip: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{5}')
      ])
    });
  }
}
