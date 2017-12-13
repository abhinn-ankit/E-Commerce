import {Injectable} from '@angular/core';
import {UserAccountService} from './userAccount.service';

@Injectable()
export class CartService {
  constructor(private userAccountService: UserAccountService) {
  }

  updateCart(cart) {
    console.log(this.userAccountService.user['cart'].length);
    if ( this.userAccountService.user['cart'].length >= 0 ) {
      this.userAccountService.user.cart.forEach(function (c) {
        console.log(cart.productId == c.productId);
        if (cart.productId == c.productId && cart.size === c.size) {
          c.qty = cart.qty;
          return;
        }
      });
    }
    this.userAccountService.user.cart.push(cart);
  }

}
