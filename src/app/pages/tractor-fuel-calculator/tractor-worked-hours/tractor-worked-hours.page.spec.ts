import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TractorWorkedHoursPage } from './tractor-worked-hours.page';

describe('TractorWorkedHoursPage', () => {
  let component: TractorWorkedHoursPage;
  let fixture: ComponentFixture<TractorWorkedHoursPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TractorWorkedHoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
