import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { UserProductPageComponent } from './user-product-page/user-product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CouponManagementComponent } from './coupon-management/coupon-management.component';
import { TaskComponent } from './task/task.component';
import { TaskInfoCardComponent } from './task-info-card/task-info-card.component';
import { TaskUpdateModalComponent } from './task-update-modal/task-update-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainContentComponent,
    UserProductPageComponent,
    CartPageComponent,
    ProductListComponent,
    CouponManagementComponent,
    TaskComponent,
    TaskInfoCardComponent,
    TaskUpdateModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
