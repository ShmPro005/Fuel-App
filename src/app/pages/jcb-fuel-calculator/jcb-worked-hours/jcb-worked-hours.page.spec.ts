import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JcbWorkedHoursPage } from './jcb-worked-hours.page';

describe('JcbWorkedHoursPage', () => {
  let component: JcbWorkedHoursPage;
  let fixture: ComponentFixture<JcbWorkedHoursPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JcbWorkedHoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
