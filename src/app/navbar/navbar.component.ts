import { Component } from '@angular/core';

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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  public cartList: product[] = [];
  public proList: product[] = [];
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
    setInterval(() => {
      // console.log('inside===================');
      let userItemList = localStorage.getItem('productCartData');

      if (userItemList && userItemList != 'null') {
        this.cartList = JSON.parse(userItemList);
      }
      // console.log('cart length-----', this.cartList.length);
    }, 1000);
  }

  getSubTotal() {
    // console.log('getSubTotal==============');
    let subTotal = 0;
    this.cartList.forEach((el: any) => {
      subTotal += el.qty * el.price;
    });
    return subTotal.toFixed(2);
  }

  removeProduct(index: number) {
    let userItemList1 = localStorage.getItem('userProductData');
    if (userItemList1 && userItemList1 != 'null') {
      this.proList = JSON.parse(userItemList1);
    }
    let newProductIndex = this.cartList[index].index as number;
    // if (!this.proList) return;
    this.proList[newProductIndex].isAdded = false;
    localStorage.setItem('userProductData', JSON.stringify(this.proList));
    console.log('removeProduct..length------', this.cartList.length);
    console.log('removeProduct..inndex----------', index);
    this.cartList.splice(index, 1);
    localStorage.setItem('productCartData', JSON.stringify(this.cartList));
    console.log('lengtha----------', this.cartList.length);
    console.log('gst----------', this.orderSummary.gst);
    // this.calcFinalOrderSummary();
  }
}
