import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// import { Modal } from 'bootstrap';

// export interface Product {
//   name: string;
//   img: string;
//   primaryInfo: string;
//   secondaryInfo: string;
//   ternaryInfo: string;
//   caption: string;
//   otherInfoBtn: string;
//   price: number;
//   qty: number;
//   isDisabled: boolean;
//   isAdded: boolean;
//   index?: number;
// }

export class Product {
  name: string;
  img: string;
  primaryInfo: string;
  secondaryInfo: string;
  ternaryInfo: string;
  caption: string;
  otherInfoBtn: string;
  price: number;
  qty: number;
  isDisabled: boolean;
  isAdded: boolean;
  index?: number;

  // Constructor to initialize properties
  constructor(
    name: string,
    img: string,
    primaryInfo: string,
    secondaryInfo: string,
    ternaryInfo: string,
    caption: string,
    otherInfoBtn: string,
    price: number,
    qty: number,
    isDisabled: boolean = false,
    isAdded: boolean = false,
    index?: number
  ) {
    this.name = name;
    this.img = img;
    this.primaryInfo = primaryInfo;
    this.secondaryInfo = secondaryInfo;
    this.ternaryInfo = ternaryInfo;
    this.caption = caption;
    this.otherInfoBtn = otherInfoBtn;
    this.price = price;
    this.qty = qty;
    this.isDisabled = isDisabled;
    this.isAdded = isAdded;
    this.index = index;
  }
}

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent {
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

  public couponCode = [
    {
      code: 'ZEPBHIM25',
      discount: 20,
      discountType: 'percentage',
      minPurchase: 500,
      isActive: true,
      primaryInfo: 'Get flat 20% off with BHIM UPI',
      secondaryInfo:
        'Get 20% discount on transaction above $500 with BHIM UPI ',
      percentOff: 25,
      flatOff: null,
      expiredAt: '03-05-2025',
    },
    {
      code: 'ZEPBHIM20',
      discount: 0,
      discountType: 'freeshipping',
      minPurchase: 600,
      isActive: true,
      primaryInfo: 'Get flat 20% off with Kotak bank',
      secondaryInfo:
        'Get Free Shipping on transaction above $600 with Kotak bank ',
      percentOff: 20,
      flatOff: null,
      expiredAt: null,
    },
    {
      code: 'ZEPFLAT',
      discount: 100,
      discountType: 'flat',
      minPurchase: 500,
      isActive: true,
      primaryInfo: 'Get flat 50 off with SBI bank',
      secondaryInfo:
        'Get Flat $100 discount on transaction above $500 with SBI bank ',
      percentOff: null,
      flatOff: 50,
      expiredAt: '15-04-2025',
    },
  ];

  public userProduct = {
    name: '',
    price: 0,
    qty: 0,
  } as Product;

  public newProducts: Product[] = [
    {
      name: 'Pi Pizza Oven 1',
      img: '../main-content/../../assets/oven.jpg',
      primaryInfo: 'Estimated Ship Date:June 6th',
      secondaryInfo: '',
      ternaryInfo: 'Change',
      caption: 'Fuel Source: Wood Only',
      otherInfoBtn: '',
      price: 100.99,
      qty: 1,
      isDisabled: false,
      isAdded: false,
    },
    {
      name: 'Pi Pizza Oven 2',
      img: '../main-content/../../assets/oven.jpg',
      primaryInfo: 'Estimated Ship Date:June 6th',
      secondaryInfo: '',
      ternaryInfo: 'Change',
      caption: 'Fuel Source: Wood Only',
      otherInfoBtn: '',
      price: 200,
      qty: 1,
      isDisabled: false,
      isAdded: false,
    },
    {
      name: 'Pi Pizza Oven 3',
      img: '../main-content/../../assets/oven.jpg',
      primaryInfo: 'Estimated Ship Date:June 6th',
      secondaryInfo: '',
      ternaryInfo: 'Change',
      caption: 'Fuel Source: Wood Only',
      otherInfoBtn: '',
      price: 469.99,
      qty: 1,
      isDisabled: false,
      isAdded: false,
    },
    {
      name: 'Grill Ultimate Bundle',
      img: '../main-content/../../assets/grill.jpg',
      primaryInfo: '',
      secondaryInfo: 'Solo Stove',
      ternaryInfo: '',
      caption: '',
      otherInfoBtn: 'Add accident protection for $29.99',
      price: 549.99,
      qty: 1,
      isDisabled: false,
      isAdded: false,
    },
    {
      name: 'Starters',
      img: '../main-content/../../assets/starters.jpg',
      primaryInfo: '4 packs',
      secondaryInfo: 'Solo Stove',
      ternaryInfo: '',
      caption: '',
      otherInfoBtn: '',
      price: 0.0,
      qty: 1,
      isDisabled: true,
      isAdded: false,
    },
    {
      name: 'Charcoal Grill Pack',
      img: '../main-content/../../assets/charcoal.webp',
      primaryInfo: '',
      secondaryInfo: 'Solo Stove',
      ternaryInfo: '',
      caption: '',
      otherInfoBtn: '',
      price: 0.0,
      qty: 1,
      isDisabled: true,
      isAdded: false,
    },
  ];

  public newProducts1: Product[] | null = null;

  public newOrders: Product[] = [];
  orderSummary: any = {
    subTotal: 0,
    grandTotal: 0,
    finalAmount: 0,
    shippingCharges: 0,
    gst: 102,
    btnDisabled: false,
    discount: 0,
  };

  ngOnInit() {
    // Output: "Janvi"
    let proData = localStorage.getItem('myProduct');
    if (proData && proData != 'null') {
      this.newProducts = JSON.parse(proData);
    }
    this.orderSummary.gst = 0;
    this.calcFinalOrderSummary();
    this.orderSummary.gst = 102;
    localStorage.setItem('myProduct', JSON.stringify(this.newProducts));
  }

  showSuccess() {
    this.toastr.success('', 'Added to cart!');
  }

  showCouponCardSuccess() {
    this.toastr.success('', 'Coupon Card Applied');
  }

  calcFinalOrderSummary() {
    this.orderSummary.subTotal = 0;
    this.newOrders.forEach((el: any) => {
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

    this.orderSummary.grandTotal = this.orderSummary.grandTotal.toFixed(2);
    this.orderSummary.finalAmount = this.orderSummary.finalAmount.toFixed(2);
    this.orderSummary.subTotal = this.orderSummary.subTotal.toFixed(2);
  }

  increaseQty(index: number) {
    const currentpro = localStorage.getItem('myProduct');
    console.log('currentpro', currentpro);
    // const paresdPro: any[] = currentpro ? JSON.parse(currentpro) : null;
    let paresdPro = null;

    if (currentpro) {
      paresdPro = JSON.parse(currentpro);
      console.log('paresdPro', paresdPro);
      paresdPro.push(this.newOrders[0]);
      localStorage.setItem('myProduct', JSON.stringify(paresdPro));
    }

    this.newOrders[index].qty++;
    this.calcFinalOrderSummary();
  }

  decreaseQty(index: number) {
    const currentpro = localStorage.getItem('myProduct');
    console.log('currentpro', currentpro);
    // const paresdPro: any[] = currentpro ? JSON.parse(currentpro) : null;
    let paresdPro = null;

    if (currentpro) {
      paresdPro = JSON.parse(currentpro);
      console.log('paresdPro', paresdPro);
      paresdPro.pop();
      localStorage.setItem('myProduct', JSON.stringify(paresdPro));
    }

    if (this.newOrders[index].qty > 1) {
      this.newOrders[index].qty--;
      this.calcFinalOrderSummary();
    }
  }
  removeProduct(index: number) {
    // const removeIndex = this.newProducts.findIndex(
    //   (el: any) => el == this.newOrders[index]
    // );
    // console.log("removeindex------------",removeIndex);

    // this.newProducts[removeIndex].isAdded = false;
    let newProductIndex = this.newOrders[index].index as number;
    if (!this.newProducts) return;
    this.newProducts[newProductIndex].isAdded = false;
    console.log('removeProduct..length------', this.newOrders.length);
    console.log('removeProduct..inndex----------', index);
    this.newOrders.splice(index, 1);
    console.log('lengtha----------', this.newOrders.length);
    console.log('gst----------', this.orderSummary.gst);
    this.calcFinalOrderSummary();
  }

  addToCart(product: Product, index: number) {
    if (!this.newProducts) return;
    this.newProducts[index].isAdded = true;
    // const isFind = this.newOrders.some((el: any) => el == product);
    const isFind = this.newOrders.findIndex((el: any) => el == product);
    if (isFind == -1) {
      product.index = index;
      this.newOrders.push(product);
      console.log(this.newOrders);
      this.calcFinalOrderSummary();
    }
    this.showSuccess();
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
      this.couponCode[index].minPurchase > this.orderSummary.subTotal ||
      this.checkDateStatus(couponDate) === 'Expired'
    ) {
      return true;
    } else {
      return false;
    }
  }

  onCouponCardApplyClick(couponCode: string) {
    this.selectedCoupon = couponCode;
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
    const index = this.couponCode.findIndex(
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
      if (this.orderSummary.subTotal >= this.couponCode[index].minPurchase) {
        this.finalCoupon = this.selectedCoupon;
        this.showCouponCardSuccess();
        this.errorMessage = '';
        if (this.couponCode[index].discountType == 'percentage') {
          this.orderSummary.discount =
            (this.orderSummary.subTotal * this.couponCode[index].discount) /
            100;
        } else if (this.couponCode[index].discountType == 'freeshipping') {
          this.orderSummary.shippingCharges = 0;
        } else if (this.couponCode[index].discountType == 'flat') {
          this.orderSummary.discount = this.couponCode[index].discount;
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

  addNewProduct() {
    // localStorage.getItem("myProduct");
    console.log(this.newProducts);

    const newProduct = new Product(
      this.userProduct.name + (this.newProducts.length + 1),
      '../main-content/../../assets/oven.jpg',
      'Estimated Ship Date:June 6th',
      '',
      'Change',
      'Fuel Source: Wood Only',
      '',
      this.userProduct.price,
      this.userProduct.qty,
      false,
      false
    );
    console.log(newProduct);
    this.newProducts.push(newProduct);
    localStorage.setItem('myProduct', JSON.stringify(this.newProducts));

    // {
    //   name: 'Pi Pizza Oven 1',
    //   img: '../main-content/../../assets/oven.jpg',
    //   primaryInfo: 'Estimated Ship Date:June 6th',
    //   secondaryInfo: '',
    //   ternaryInfo: 'Change',
    //   caption: 'Fuel Source: Wood Only',
    //   otherInfoBtn: '',
    //   price: 100.99,
    //   qty: 1,
    //   isDisabled: false,
    //   isAdded: false,
    // }
  }
}
