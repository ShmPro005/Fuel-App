import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiniTractorFuelCostPage } from './mini-tractor-fuel-cost.page';

describe('MiniTractorFuelCostPage', () => {
  let component: MiniTractorFuelCostPage;
  let fixture: ComponentFixture<MiniTractorFuelCostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniTractorFuelCostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
