import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiniTractorFeraCostPage } from './mini-tractor-fera-cost.page';

describe('MiniTractorFeraCostPage', () => {
  let component: MiniTractorFeraCostPage;
  let fixture: ComponentFixture<MiniTractorFeraCostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniTractorFeraCostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
