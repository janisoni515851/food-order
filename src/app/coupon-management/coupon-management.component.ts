import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
export interface product {
  name: string;
  price: number;
  qty: number;
  img: string;
  primaryInfo: string;
  secondaryInfo: string;
  ternaryInfo: string;
  caption: string;
  otherInfoBtn: string;
  isDisabled: boolean;
  isAdded: boolean;
}
export interface coupon {
  code: string;
  discount: number;
  discountType: number;
  minCartValue: number;
  primaryInfo: string;
  secondaryInfo: string;
  expiry: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  couponType: string;
}
@Component({
  selector: 'app-coupon-management',
  templateUrl: './coupon-management.component.html',
  styleUrls: ['./coupon-management.component.css'],
})
export class CouponManagementComponent {
  constructor(private toastr: ToastrService) {}
  public discountTypes = [
    { id: 1, name: 'percentage' },
    { id: 2, name: 'flat' },
    { id: 3, name: 'freeshipping' },
  ];

  public couponCreate = {
    code: '',
    discount: 0,
    discountType: 0,
    minCartValue: 0,
    primaryInfo: '',
    secondaryInfo: '',
    expiry: '',
    isActive: false,
    createdAt: '',
    updatedAt: '',
    couponType: '',
  };
  public productList: product[] = [];
  public proList: product[] = [];
  public couponList: coupon[] = [];
  public swapBtn = false;
  public productIndex = 0;
  public errorMessage = '';
  public isBtnActive = false;

  ngOnInit() {
    this.swapBtn = false;

    // let userItemList = localStorage.getItem('userProductData');
    // if (userItemList && userItemList != 'null') {
    //   this.proList = JSON.parse(userItemList);
    // }

    let couponItems = localStorage.getItem('couponlist');
    if (couponItems && couponItems != 'null') {
      this.couponList = JSON.parse(couponItems);
    }
  }

  showSuccess() {
    this.toastr.success('', 'Coupon is updated !');
  }

  showSuccessCreated() {
    this.toastr.success('', 'Coupon is created !');
  }

  // checkCouponDateStatus(): string {
  //   const currentDate = new Date();
  //   currentDate.setHours(0, 0, 0, 0);
  //   currentDate.getTime();

  //   console.log(currentDate);
  //   return currentDate.toLocaleString();
  // }
  createCoupon() {
    if (this.couponCreate.code != '') {
      // this.couponCreate.createdAt = this.checkCouponDateStatus();
      this.couponCreate.createdAt = new Date().toLocaleString();
      this.errorMessage = '';
      let couponItems = localStorage.getItem('couponlist');
      if (couponItems && couponItems != 'null') {
        this.couponList = JSON.parse(couponItems);
      }
      this.couponList.push(this.couponCreate);
      localStorage.setItem('couponlist', JSON.stringify(this.couponList));
      this.showSuccessCreated();
    } else {
      this.errorMessage = 'Enter Valid Input !';
    }
  }

  updateUserProduct() {
    this.errorMessage = '';
    // this.couponCreate.updatedAt = this.checkCouponDateStatus();
    this.couponCreate.updatedAt = new Date().toLocaleString();
    let couponItems = localStorage.getItem('couponlist');
    if (couponItems && couponItems != 'null') {
      this.couponList = JSON.parse(couponItems);
    }

    this.couponList.splice(this.productIndex, 1, this.couponCreate);
    localStorage.setItem('couponlist', JSON.stringify(this.couponList));
    this.swapBtn = false;

    // this.refreshForm();
    this.showSuccess();
  }

  editProduct(index: number) {
    this.productIndex = index;
    this.swapBtn = true;
    let userItemList = localStorage.getItem('userProductData');

    if (userItemList && userItemList != 'null') {
      this.proList = JSON.parse(userItemList);
    }

    let couponItems = localStorage.getItem('couponlist');
    if (couponItems && couponItems != 'null') {
      this.couponList = JSON.parse(couponItems);
    }
    this.couponCreate.code = this.couponList[index].code;
    this.couponCreate.discount = this.couponList[index].discount;
    this.couponCreate.discountType = this.couponList[index].discountType;
    this.couponCreate.minCartValue = this.couponList[index].minCartValue;
    this.couponCreate.primaryInfo = this.couponList[index].primaryInfo;
    this.couponCreate.secondaryInfo = this.couponList[index].secondaryInfo;
    this.couponCreate.expiry = this.couponList[index].expiry;
    this.couponCreate.couponType = this.couponList[index].couponType;
  }
  deleteProduct(index: number) {
    // let userItemList = localStorage.getItem('userProductData');

    // if (userItemList && userItemList != 'null') {
    //   this.proList = JSON.parse(userItemList);
    // }

    let couponItems = localStorage.getItem('couponlist');
    if (couponItems && couponItems != 'null') {
      this.couponList = JSON.parse(couponItems);
    }
    this.couponList.splice(index, 1);
    localStorage.setItem('couponlist', JSON.stringify(this.couponList));
    // this.proList.splice(index, 1);
    // localStorage.setItem('userProductData', JSON.stringify(this.proList));
    // this.refreshForm();
  }
  isActive(index: number) {
    let couponItems = localStorage.getItem('couponlist');
    if (couponItems && couponItems != 'null') {
      this.couponList = JSON.parse(couponItems);
    }
    this.couponList[index].isActive = true;
    localStorage.setItem('couponlist', JSON.stringify(this.couponList));
  }

  inActive(index: number) {
    let couponItems = localStorage.getItem('couponlist');
    if (couponItems && couponItems != 'null') {
      this.couponList = JSON.parse(couponItems);
    }
    this.couponList[index].isActive = false;
    localStorage.setItem('couponlist', JSON.stringify(this.couponList));
  }

  getDiscountType(index: number): string {
    let input = this.discountTypes.find((input) => input.id === index);
    return input ? input.name : 'null';
  }
}
