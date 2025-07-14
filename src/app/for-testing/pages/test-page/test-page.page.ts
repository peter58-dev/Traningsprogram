import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TestModalComponent } from '../../modal/test-modal/test-modal.component';

/**
 * Enkel testsida för att öppna en modal manuellt.
 */
@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.page.html',
  styleUrls: ['./test-page.page.scss'],
  standalone: false,
})
export class TestPagePage {
  constructor(private modalCtrl: ModalController) {}

  async openTestModal() {
    const modal = await this.modalCtrl.create({
      component: TestModalComponent,
      componentProps: {
        title: 'Test Modal',
        heightClass: 'h-md',
        colorClass: 'c-warning',
      },
      cssClass: 'modal-base h-md c-warning',
    });

    await modal.present();
  }
}
