import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  myForm: FormGroup<any>;
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      namn: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  green() {
    console.log('grön');
  }
  basket() {
    console.log('BOLLn');
  }
}
