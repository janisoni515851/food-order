import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductPageComponent } from './user-product-page.component';

describe('UserProductPageComponent', () => {
  let component: UserProductPageComponent;
  let fixture: ComponentFixture<UserProductPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProductPageComponent]
    });
    fixture = TestBed.createComponent(UserProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
