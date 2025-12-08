import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TractorFeraCostPage } from './tractor-fera-cost.page';

describe('TractorFeraCostPage', () => {
  let component: TractorFeraCostPage;
  let fixture: ComponentFixture<TractorFeraCostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TractorFeraCostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
