import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiniTractorWorkedHoursPage } from './mini-tractor-worked-hours.page';

describe('MiniTractorWorkedHoursPage', () => {
  let component: MiniTractorWorkedHoursPage;
  let fixture: ComponentFixture<MiniTractorWorkedHoursPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniTractorWorkedHoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
