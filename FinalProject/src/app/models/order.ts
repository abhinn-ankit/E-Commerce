
export class Order {
  constructor(public productList: [{
                size: string,
                qty: number,
                productId: string
              }],
              public orderDate: Date,
              public userAccountID: string,
              public receiverName: string,
              public state: string,
              public zipCode: number,
              public addressLine1: string,
              public addressLine2?: string) {
  }
}
