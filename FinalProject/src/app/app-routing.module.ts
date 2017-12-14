import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponentComponent} from './login-component/login-component.component';
import {HomeComponentComponent} from './home-component/home-component.component';
import {ItemComponentComponent} from './item-component/item-component.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CartComponent} from './cart/cart.component';
import {OrdersComponentComponent} from './orders-component/orders-component.component';
import {ViewOrderComponent} from './view-order/view-order.component';
import {CheckoutComponentComponent} from './checkout-component/checkout-component.component';
import {PaymentComponent} from './payment/payment.component';
import {DetailComponent} from './detail/detail.component';
import {AuthService} from './services/auth.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponentComponent,
    // outlet: 'home'
  },
  {
    path: 'search',
    component: ItemComponentComponent,
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: ':productType',
        component: ItemComponentComponent
      },
      {
        path: ':productType/:productID',
        component: DetailComponent
      },
    ]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthService]
  },
  {
    path: 'checkout',
    component: CheckoutComponentComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: ':filterType',
    component: ItemComponentComponent,
  },
  {
    path: 'account',
    children: [
      {
        path: 'login',
        component: LoginComponentComponent
      },
      {
        path: 'orders',
        component: OrdersComponentComponent
      },
      {
        path: 'orderID',
        component: ViewOrderComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
