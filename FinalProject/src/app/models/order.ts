
export class Order {
  constructor(public productList: ListOfProducts[],
              public orderDate: Date,
              public userAccountID: string,
              public receiverName: string,
              public state: string,
              public zipCode: number,
              public contactNumber: string,
              public addressLine1: string,
              public addressLine2?: string) {
  }
}

export interface ListOfProducts {
  size: string;
  qty: number;
  productId: string;
}
