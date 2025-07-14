import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-modal',
  templateUrl: './exercise-modal.component.html',
  styleUrls: ['./exercise-modal.component.scss'],
  standalone: false,
})
export class ExerciseModalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('fungerar');
  }
}
