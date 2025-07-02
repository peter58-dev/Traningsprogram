import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  visaMeddelanden = signal(false);
  constructor() {}

  toggleMeddelanden() {
    this.visaMeddelanden.update((value: boolean) => !value);
  }
}
