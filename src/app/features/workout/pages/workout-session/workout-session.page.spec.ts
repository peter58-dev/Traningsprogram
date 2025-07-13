import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutSessionPage } from './workout-session.page';

describe('WorkoutSessionPage', () => {
  let component: WorkoutSessionPage;
  let fixture: ComponentFixture<WorkoutSessionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
