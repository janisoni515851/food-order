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
  index?: number;
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
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  public proList: product[] = [];
  public cartList: product[] = [];
  public couponList: coupon[] = [];
  constructor(private toastr: ToastrService) {}
  public selectedCoupon = '';
  public finalCoupon = '';
  public errorMessage = '';
  public applyBtnDisabled = false;
  public messageDisplay = 0;
  public couponCodeList = [
    {
      code: 'ABC1',
      discount: 10,
      discountType: 'percentage',
      minPurchase: 200,
      isActive: true,
    },
    {
      code: 'ABC2',
      discount: 200,
      discountType: 'flat',
      minPurchase: 700,
      isActive: true,
    },
    {
      code: 'ABC3',
      discount: 0,
      discountType: 'freeshipping',
      minPurchase: 500,
      isActive: true,
    },
    {
      code: 'ABC4',
      discount: 5,
      discountType: 'percentage',
      minPurchase: 350,
      isActive: true,
    },
  ];

  public couponCreate = {
    code: '',
    discount: 0,
    discountType: '',
    minCartValue: 0,
    primaryInfo: '',
    secondaryInfo: '',
    expiry: '',
    isActive: false,
    createdAt: '',
    updatedAt: '',
    couponType: '',
  };

  orderSummary: any = {
    subTotal: 0,
    grandTotal: 0,
    finalAmount: 0,
    shippingCharges: 0,
    gst: 102,
    btnDisabled: false,
    discount: 0,
  };

  checkCouponDateStatus(): string {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate.getTime();

    console.log(currentDate);
    return currentDate.toLocaleString();
  }
  ngOnInit() {

    let userItemList = localStorage.getItem('productCartData');

    if (userItemList && userItemList != 'null') {
      this.cartList = JSON.parse(userItemList);
    }

    let couponItems = localStorage.getItem('couponlist');
    if (couponItems && couponItems != 'null') {
      this.couponList = JSON.parse(couponItems);
    }

    this.orderSummary.gst = 0;
    this.calcFinalOrderSummary();
    this.orderSummary.gst = 102;
  }

  showSuccess() {
    this.toastr.success('', 'Added to cart!');
  }
  showSuccessRemove() {
    this.toastr.success('', 'Item is removed from cart !');
  }

  showCouponCardSuccess() {
    this.toastr.success('', 'Coupon Card Applied');
  }

  calcFinalOrderSummary() {
    this.orderSummary.subTotal = 0;
    this.cartList.forEach((el: any) => {
      this.orderSummary.subTotal += el.qty * el.price;
    });

    if (this.orderSummary.subTotal == 0) {
      this.orderSummary.gst = 0;
      this.orderSummary.shippingCharges = 0;
      this.orderSummary.btnDisabled = true;
    }

    if (this.orderSummary.subTotal > 0) {
      this.orderSummary.btnDisabled = false;
      this.orderSummary.gst = parseFloat(
        ((this.orderSummary.subTotal * 18) / 100).toFixed(2)
      );
    }

    if (this.orderSummary.subTotal <= 500) {
      this.orderSummary.shippingCharges = parseFloat(
        ((this.orderSummary.subTotal * 15) / 100).toFixed(2)
      );

      if (
        this.orderSummary.shippingCharges < 50 &&
        this.orderSummary.subTotal != 0
      ) {
        this.orderSummary.shippingCharges = 50;
      }
    }

    if (this.orderSummary.subTotal > 500) {
      this.orderSummary.shippingCharges = 0;
    }

    this.orderSummary.finalAmount =
      this.orderSummary.subTotal +
      this.orderSummary.gst +
      this.orderSummary.shippingCharges;
    debugger;
    this.orderSummary.grandTotal = this.orderSummary.grandTotal.toFixed(2);
    this.orderSummary.finalAmount = this.orderSummary.finalAmount.toFixed(2);
    this.orderSummary.subTotal = this.orderSummary.subTotal.toFixed(2);
  }

  increaseQty(index: number) {
    this.cartList[index].qty++;
    this.calcFinalOrderSummary();
  }

  decreaseQty(index: number) {
    if (this.cartList[index].qty > 1) {
      this.cartList[index].qty--;
      this.calcFinalOrderSummary();
    }
  }
  removeProduct(index: number) {
    this.showSuccessRemove();
    let newProductIndex =0;
    let userItemList = localStorage.getItem('userProductData');
    if (userItemList && userItemList != 'null') {
      this.proList = JSON.parse(userItemList);
    }
    newProductIndex=this.proList.findIndex(el=>el.name==this.cartList[index].name)
    this.proList[newProductIndex].isAdded = false;
    localStorage.setItem('userProductData', JSON.stringify(this.proList));
    console.log('removeProduct..length------', this.cartList.length);
    console.log('removeProduct..inndex----------', index);
    this.cartList.splice(index, 1);
    localStorage.setItem('productCartData', JSON.stringify(this.cartList));
    console.log('lengtha----------', this.cartList.length);
    console.log('gst----------', this.orderSummary.gst);
    this.calcFinalOrderSummary();
    this.showSuccessRemove();
  }

  checkDateStatus(inputDate: any): string {
    if (inputDate == null) {
      return 'APPLY';
    }
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const parsedInputDate = new Date(inputDate);
    parsedInputDate.setHours(0, 0, 0, 0);

    console.log(currentDate);
    console.log(parsedInputDate);
    console.log(currentDate.getTime() == parsedInputDate.getTime());

    if (parsedInputDate.getTime() < currentDate.getTime()) {
      return 'Expired';
    } else if (parsedInputDate > currentDate) {
      return 'Apply';
    } else {
      return 'Apply fast, expiring soon';
    }
  }

  checkBtnStatus(index: number, couponDate: any): boolean {
    if (
      this.couponList[index].minCartValue > this.orderSummary.subTotal ||
      this.checkDateStatus(couponDate) === 'Expired'
    ) {
      return true;
    } else {
      return false;
    }
  }

  onCouponCardApplyClick(couponList: string) {
    this.selectedCoupon = couponList;
  }
  removeCoupon() {
    this.selectedCoupon = '';
    this.finalCoupon = '';
    this.orderSummary.discount = 0;
    this.calcFinalOrderSummary();
  }

  refreshModal() {
    this.errorMessage = '';
    this.applyBtnDisabled = false;
    this.selectedCoupon = '';
    this.messageDisplay = 0;
  }

  calcDiscount() {
    const index = this.couponList.findIndex(
      (el: any) => el.code == this.selectedCoupon
    );

    const indexCouponList = this.couponCodeList.findIndex(
      (el: any) => el.code == this.selectedCoupon
    );
    if (index == -1 && indexCouponList == -1) {
      this.errorMessage = 'Enter Valid Input !';
      this.selectedCoupon = '';
    }

    if (index != -1) {
      if (this.orderSummary.subTotal >= this.couponList[index].minCartValue) {
        this.finalCoupon = this.selectedCoupon;
        this.showCouponCardSuccess();
        this.errorMessage = '';
        if (this.couponList[index].discountType ==1) {
          this.orderSummary.discount =
            (this.orderSummary.subTotal * this.couponList[index].discount) /
            100;
        } else if (this.couponList[index].discountType == 3) {
          this.orderSummary.shippingCharges = 0;
        } else if (this.couponList[index].discountType == 2) {
          this.orderSummary.discount = this.couponList[index].discount;
        }
      } else {
        this.orderSummary.selectedCoupon = '';
        this.orderSummary.finalCoupon = '';
      }
    } else if (indexCouponList != -1) {
      if (
        this.couponCodeList[indexCouponList].minPurchase >
        this.orderSummary.subTotal
      ) {
        this.messageDisplay = parseFloat(
          (
            this.couponCodeList[indexCouponList].minPurchase -
            this.orderSummary.subTotal
          ).toFixed(2)
        );
      }
      if (
        this.orderSummary.subTotal >=
        this.couponCodeList[indexCouponList].minPurchase
      ) {
        this.finalCoupon = this.selectedCoupon;
        this.showCouponCardSuccess();
        this.errorMessage = '';
        if (this.couponCodeList[indexCouponList].discountType == 'percentage') {
          this.orderSummary.discount =
            (this.orderSummary.subTotal *
              this.couponCodeList[indexCouponList].discount) /
            100;
        } else if (
          this.couponCodeList[indexCouponList].discountType == 'freeshipping'
        ) {
          this.orderSummary.shippingCharges = 0;
        } else if (
          this.couponCodeList[indexCouponList].discountType == 'flat'
        ) {
          this.orderSummary.discount =
            this.couponCodeList[indexCouponList].discount;
        }
      } else {
        this.orderSummary.selectedCoupon = '';
        this.orderSummary.finalCoupon = '';
      }
    }
  }
}
