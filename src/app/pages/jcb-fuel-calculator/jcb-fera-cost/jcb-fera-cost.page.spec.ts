import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JcbFeraCostPage } from './jcb-fera-cost.page';

describe('JcbFeraCostPage', () => {
  let component: JcbFeraCostPage;
  let fixture: ComponentFixture<JcbFeraCostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JcbFeraCostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
