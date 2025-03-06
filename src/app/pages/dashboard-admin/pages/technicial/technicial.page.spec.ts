import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnicialPage } from './technicial.page';

describe('TechnicialPage', () => {
  let component: TechnicialPage;
  let fixture: ComponentFixture<TechnicialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
