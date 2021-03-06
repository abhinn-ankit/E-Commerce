import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccountService } from '../services/userAccount.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  myForm: FormGroup;

  constructor(private userAccountService: UserAccountService, private orderService: OrderService, private router: Router) {
  }

  onSubmit() {
    this.orderService.placeOrder(this.orderService.order).subscribe(
      data => {
        console.log(data);
        alert('Order Placed!!');
        this.userAccountService.getCurrentUser()
          .subscribe(() => {
            window.location.replace('/home');
            this.router.navigateByUrl('/');
          });
      },
      error => console.error(error)
    );
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      holderName: new FormControl(null, Validators.required),
      cardNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{16}')
      ]),
      cvv: new FormControl(null, [
        Validators.required
      ])
    });
  }

}
