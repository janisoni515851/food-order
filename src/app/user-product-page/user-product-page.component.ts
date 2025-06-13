import { Component } from '@angular/core';

export interface product {
  name: string;
  salePrice: number;
  retailedPrice:number;
  qty: number;
  img:string;
  primaryInfo:string;
  secondaryInfo:string;
  ternaryInfo:string;
  caption:string;
  otherInfoBtn:string;
  isDisabled:boolean;
  isAdded:boolean;
  imgType:string;
}
@Component({
  selector: 'app-user-product-page',
  templateUrl: './user-product-page.component.html',
  styleUrls: ['./user-product-page.component.css'],
})
export class UserProductPageComponent {
  public addProduct = {
    name: '',
    salePrice: 0,
    retailedPrice:0,
    qty: 0,
    img: '',
    primaryInfo: '',
    secondaryInfo: '',
    ternaryInfo: '',
    caption: '',
    otherInfoBtn: '',
    isDisabled: false,
    isAdded: false,
    imgType:'',
  };
  public productList: product[] = [];
  public proList: product[] = [];
  public swapBtn = false;
  public productIndex = 0;
  public errorMessage = '';

  ngOnInit() {
    this.swapBtn = false;
    let userItemList = localStorage.getItem('userProductData');

    if (userItemList && userItemList != 'null') {
      this.proList = JSON.parse(userItemList);
    }
  }

  addUserProduct() {
    if (
      this.addProduct.name != '' &&
      this.addProduct.salePrice >= 0 &&
      this.addProduct.qty != 0
    ) {
      this.errorMessage = '';
      let userItemList = localStorage.getItem('userProductData');

      if (userItemList && userItemList != 'null') {
        this.proList = JSON.parse(userItemList);
      }
      console.log('inside function-------');
      this.proList.push(this.addProduct);
      console.log('array------', this.productList);
      localStorage.setItem('userProductData', JSON.stringify(this.proList));
    } else {
      this.errorMessage = 'Enter Valid Input !';
    }
  }

  updateUserProduct() {
    if (
      this.addProduct.name != '' &&
      this.addProduct.salePrice >= 0 &&
      this.addProduct.qty != 0
    ) {
      this.errorMessage = '';
      let userItemList = localStorage.getItem('userProductData');

      if (userItemList && userItemList != 'null') {
        this.proList = JSON.parse(userItemList);
      }

      this.proList.splice(this.productIndex, 1, this.addProduct);
      console.log('index------------------', this.productIndex);
      console.log('addproduct----', this.addProduct);
      localStorage.setItem('userProductData', JSON.stringify(this.proList));
      this.swapBtn = false;
    } else {
      this.errorMessage = 'Enter Valid Input !';
    }

    // this.refreshForm();
  }

  editProduct(index: number) {
    this.productIndex = index;
    this.swapBtn = true;
    let userItemList = localStorage.getItem('userProductData');

    if (userItemList && userItemList != 'null') {
      this.proList = JSON.parse(userItemList);
    }
    this.addProduct.name = this.proList[index].name;
    this.addProduct.salePrice = this.proList[index].salePrice;
    this.addProduct.qty = this.proList[index].qty;
    this.addProduct.img=this.proList[index].img;
    this.addProduct.secondaryInfo=this.proList[index].secondaryInfo;
    this.addProduct.primaryInfo=this.proList[index].primaryInfo;
    this.addProduct.ternaryInfo=this.proList[index].ternaryInfo;
    this.addProduct.caption=this.proList[index].caption;
    this.addProduct.otherInfoBtn=this.proList[index].otherInfoBtn;
    this.addProduct.isDisabled=this.proList[index].isDisabled;
    this.addProduct.isAdded=this.proList[index].isAdded;
  }
  deleteProduct(index: number) {
    let userItemList = localStorage.getItem('userProductData');

    if (userItemList && userItemList != 'null') {
      this.proList = JSON.parse(userItemList);
    }
    this.proList.splice(index, 1);
    localStorage.setItem('userProductData', JSON.stringify(this.proList));
    // this.refreshForm();
  }
  // refreshForm(){
  //   this.addProduct.name='';
  //   this.addProduct.price=0;
  //   this.addProduct.qty=0;
  // }
}
