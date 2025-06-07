import {
  Component,
  Input,
  OnInit,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-new-set',
  templateUrl: './new-set.component.html',
  styleUrls: ['./new-set.component.scss'],
  standalone: false,
})
export class NewSetComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);

  @Input() exerciseId: string | undefined;

  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
