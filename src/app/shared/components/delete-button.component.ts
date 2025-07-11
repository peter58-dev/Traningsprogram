import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AlertController, IonButton, IonIcon, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  // Ta bort IonButton och IonIcon från imports!
  template: `
    <ion-button
      fill="clear"
      color="danger"
      size="small"
      (click)="confirmDelete()"
      aria-label="Delete"
    >
      <ion-icon name="trash-outline" />
    </ion-button>
  `,
  imports: [IonicModule],
})
export class DeleteButtonComponent {
  @Output() delete = new EventEmitter<void>();

  private alertCtrl = inject(AlertController);

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Bekräfta borttagning',
      message: 'Vill du verkligen ta bort detta?',
      buttons: [
        { text: 'Avbryt', role: 'cancel' },
        { text: 'Ta bort', role: 'destructive', handler: () => this.delete.emit() },
      ],
    });

    await alert.present();
  }
}
