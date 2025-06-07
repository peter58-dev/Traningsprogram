import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProgramPage } from './list-program.page';

describe('ListProgramPage', () => {
  let component: ListProgramPage;
  let fixture: ComponentFixture<ListProgramPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProgramPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
