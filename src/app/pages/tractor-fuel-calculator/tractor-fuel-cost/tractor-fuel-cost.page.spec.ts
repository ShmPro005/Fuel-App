import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TractorFuelCostPage } from './tractor-fuel-cost.page';

describe('TractorFuelCostPage', () => {
  let component: TractorFuelCostPage;
  let fixture: ComponentFixture<TractorFuelCostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TractorFuelCostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
