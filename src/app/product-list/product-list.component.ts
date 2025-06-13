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


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  public proList: product[] = [];
  public cartList: product[] = [];
  constructor(private toastr: ToastrService) {}
  public selectedCoupon = '';
  public finalCoupon = '';
  public errorMessage = '';
  public applyBtnDisabled = false;
  public messageDisplay = 0;
  


  // public userProduct = {
  //   name: '',
  //   price: 0,
  //   qty: 0,
  // } as Product;

  

  // public newProducts1: Product[] | null = null;

  // public newOrders: Product[] = [];
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
    let userItemList = localStorage.getItem('userProductData');

    if (userItemList && userItemList != 'null') {
      this.proList = JSON.parse(userItemList);
    }

    // let userItemList1 = localStorage.getItem('productCartData');

    // if (userItemList1 && userItemList1 != 'null') {
    //   this.cartList = JSON.parse(userItemList1);
    // }

    // this.orderSummary.gst = 0;
    // this.orderSummary.gst = 102;
    // localStorage.setItem('myProduct', JSON.stringify(this.newProducts));
  }

  showSuccess() {
    this.toastr.success('', 'Added to cart!');
  }

  addToCart(product: product, index: number) {
    console.log('product-----', product);
    if (!this.proList) return;
    let userItemList = localStorage.getItem('userProductData');
    if (userItemList && userItemList != 'null') {
      this.proList = JSON.parse(userItemList);
    }
    this.proList[index].isAdded = true;
    localStorage.setItem('userProductData', JSON.stringify(this.proList));
    let userItemList1 = localStorage.getItem('productCartData');

    if (userItemList1 && userItemList1 != 'null') {
      this.cartList = JSON.parse(userItemList1);
    }
    // const isFind = this.newOrders.some((el: any) => el == product);
    const isFind = this.cartList.findIndex((el: any) => el == product);
    console.log('isFind----', isFind);
    console.log('product-----', product);
    if (isFind == -1) {
      product.index = index;
      this.cartList.push(product);
      localStorage.setItem('productCartData', JSON.stringify(this.cartList));
      console.log('cartlist--------', this.cartList);
    }
    this.showSuccess();
  }
}
