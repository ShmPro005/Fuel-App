import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiniTractorHistoryPage } from './mini-tractor-history.page';

describe('MiniTractorHistoryPage', () => {
  let component: MiniTractorHistoryPage;
  let fixture: ComponentFixture<MiniTractorHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniTractorHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
