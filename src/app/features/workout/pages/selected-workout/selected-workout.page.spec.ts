import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedWorkoutPage } from './selected-workout.page';

describe('SelectedWorkoutPage', () => {
  let component: SelectedWorkoutPage;
  let fixture: ComponentFixture<SelectedWorkoutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedWorkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
