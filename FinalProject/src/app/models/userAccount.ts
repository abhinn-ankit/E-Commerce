import {CartModel} from './cart';

export class UserAccount {
  constructor(public email: string,
              public password: string,
              public firstName?: string,
              public lastName?: string,
              public cart?: [{
                size: string,
                qty: number,
                productId: string
              }],
              public orderList?: number[]) {
  }
}
