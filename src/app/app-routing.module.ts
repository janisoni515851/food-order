import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProductPageComponent } from './user-product-page/user-product-page.component';
import { MainContentComponent } from './main-content/main-content.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CouponManagementComponent } from './coupon-management/coupon-management.component';
import { TaskComponent } from './task/task.component';

// const routes: Routes = [];

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ProductListComponent },
  { path: 'create-product', component: UserProductPageComponent },
  { path: 'cart', component: MainContentComponent },
  { path: 'nav', component: NavbarComponent },
  { path: 'cart-page',component:CartPageComponent },
  { path: 'coupon-page',component:CouponManagementComponent },
  { path: 'task',component:TaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
