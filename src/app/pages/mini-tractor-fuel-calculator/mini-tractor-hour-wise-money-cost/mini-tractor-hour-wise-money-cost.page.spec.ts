import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiniTractorHourWiseMoneyCostPage } from './mini-tractor-hour-wise-money-cost.page';

describe('MiniTractorHourWiseMoneyCostPage', () => {
  let component: MiniTractorHourWiseMoneyCostPage;
  let fixture: ComponentFixture<MiniTractorHourWiseMoneyCostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniTractorHourWiseMoneyCostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
