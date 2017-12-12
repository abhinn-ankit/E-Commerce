import {Injectable} from '@angular/core';
import {UserAccountService} from './userAccount.service';

@Injectable()
export class CartService {
  constructor(private userAccountService: UserAccountService) {}

  updateCart(cart) {
    this.userAccountService.cart.forEach(function (c) {
      if ( cart.productId === c.productId && cart.size === c.size ) {
        c.qty = c.qty + cart.qty;
        return;
      }
    });
    this.userAccountService.cart.push(cart);
  }

}
