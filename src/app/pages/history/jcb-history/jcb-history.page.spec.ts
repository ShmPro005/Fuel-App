import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JcbHistoryPage } from './jcb-history.page';

describe('JcbHistoryPage', () => {
  let component: JcbHistoryPage;
  let fixture: ComponentFixture<JcbHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JcbHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
