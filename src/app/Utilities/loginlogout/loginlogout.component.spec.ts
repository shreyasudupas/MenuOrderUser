import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginlogoutComponent } from './loginlogout.component';

describe('LoginlogoutComponent', () => {
  let component: LoginlogoutComponent;
  let fixture: ComponentFixture<LoginlogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginlogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginlogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
