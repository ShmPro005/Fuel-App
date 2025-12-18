import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarHistoryPage } from './car-history.page';

describe('CarHistoryPage', () => {
  let component: CarHistoryPage;
  let fixture: ComponentFixture<CarHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
