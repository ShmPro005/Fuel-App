import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JcbFuelCostPage } from './jcb-fuel-cost.page';

describe('JcbFuelCostPage', () => {
  let component: JcbFuelCostPage;
  let fixture: ComponentFixture<JcbFuelCostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JcbFuelCostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
