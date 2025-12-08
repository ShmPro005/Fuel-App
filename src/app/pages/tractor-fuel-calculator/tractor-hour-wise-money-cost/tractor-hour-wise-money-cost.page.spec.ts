import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TractorHourWiseMoneyCostPage } from './tractor-hour-wise-money-cost.page';

describe('TractorHourWiseMoneyCostPage', () => {
  let component: TractorHourWiseMoneyCostPage;
  let fixture: ComponentFixture<TractorHourWiseMoneyCostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TractorHourWiseMoneyCostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
