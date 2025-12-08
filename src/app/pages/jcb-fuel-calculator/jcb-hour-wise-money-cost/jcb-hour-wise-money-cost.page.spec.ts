import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JcbHourWiseMoneyCostPage } from './jcb-hour-wise-money-cost.page';

describe('JcbHourWiseMoneyCostPage', () => {
  let component: JcbHourWiseMoneyCostPage;
  let fixture: ComponentFixture<JcbHourWiseMoneyCostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JcbHourWiseMoneyCostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
