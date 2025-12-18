import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TractorHistoryPage } from './tractor-history.page';

describe('TractorHistoryPage', () => {
  let component: TractorHistoryPage;
  let fixture: ComponentFixture<TractorHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TractorHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
