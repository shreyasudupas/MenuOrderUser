import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentScreenComponent } from './payment-screen.component';

describe('PaymentScreenComponent', () => {
  let component: PaymentScreenComponent;
  let fixture: ComponentFixture<PaymentScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
