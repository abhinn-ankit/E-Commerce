import {CartModel} from './cart';

export class Order {
  constructor(public id: string,
              public productList: [{
                size: string,
                qty: number,
                productId: string
              }],
              public orderDate: Date,
              public userAccountID: string,
              public receiverName: string,
              public state: string,
              public zipCode: Number,
              public addressLine1: string,
              public addressLine2?: string) {
  }
}
