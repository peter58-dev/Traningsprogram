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
  newSetForm!: Signal<FormGroup>; // 🔹 Deklarera korrekt typ här!

  constructor() {
    this.newSetForm = signal(
      this.fb.group({
        sets: this.fb.array([
          this.fb.group({
            setNumber: [1],
            weight: ['', Validators.required],
            discs: [''],
            reps: ['', Validators.required],
          }),
        ]),
      })
    );
  }

  ngOnInit() {}

  get setArray(): FormArray {
    return this.newSetForm().get('sets') as FormArray;
    //Nu kan 'setsArray.controls' användas  direkt i HTML
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  addNewSet() {
    const setsArray = this.newSetForm().get('sets') as FormArray;

    setsArray.push(
      this.fb.group({
        setNumber: [setsArray.length + 1],
        weight: ['', Validators.required],
        reps: ['', Validators.required],
        discs: [''],
      })
    );
  }

  confirm() {
    if (this.newSetForm().valid) {
      const setsArray = this.newSetForm().get('sets') as FormArray; // 🔹 Deklarera här

      this.modalCtrl.dismiss(
        {
          newSet: setsArray.value[setsArray.length - 1], // 🔹 Korrekt referens
        },
        'confirm'
      );
    }
  }
}
