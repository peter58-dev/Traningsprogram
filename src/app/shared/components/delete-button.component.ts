import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AlertController, IonButton, IonIcon, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  template: `
    <ion-button
      fill="clear"
      color="danger"
      size="small"
      (click)="confirmDelete()"
      [aria-label]="label"
    >
      <ion-icon [name]="iconName" slot="icon-only" />
    </ion-button>
  `,
  imports: [IonicModule],
})
export class DeleteButtonComponent {
  @Input() iconName = 'trash-outline';
  @Input() label = 'Ta bort pass';

  @Output() delete = new EventEmitter<void>();

  private alertCtrl = inject(AlertController);

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      cssClass: 'delete-alert',
      header: 'Bekräfta borttagning',
      message: 'Vill du verkligen ta bort detta?',
      buttons: [
        { text: 'Avbryt', role: 'cancel' },
        {
          text: this.label,
          role: 'destructive',
          handler: () => this.delete.emit(),
        },
      ],
    });

    await alert.present();
  }
}

/* - 'iconName' används nu via [name], så du kan byta ikon om du vill.

- aria-label och knapptext i alert använder label, så du slipper hårdkoda "Ta bort" fler gånger.

 - Default för iconName satt till trash-outline (så du inte får bara "trash" i fallback).

- Slot "icon-only" ger rätt layout i ion-button. */
