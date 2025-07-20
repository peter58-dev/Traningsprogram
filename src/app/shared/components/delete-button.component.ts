import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [IonicModule],
  template: `
    <div
      class="delete-wrapper"
      (mouseenter)="hintVisible = true"
      (mouseleave)="hintVisible = false"
      (touchstart)="hintVisible = true"
      (touchend)="hintVisible = false"
    >
      <ion-button
        fill="clear"
        size="small"
        color="danger"
        (click)="confirmDelete()"
        aria-label="label"
      >
        <ion-icon [name]="iconName" slot="icon-only" />
      </ion-button>

      <span class="hint-label" [class.visible]="hintVisible">
        {{ hintText }}
      </span>
    </div>
  `,
})
export class DeleteButtonComponent implements OnInit {
  @Input() iconName = 'trash-outline';
  @Input() label = 'Ta bort';
  @Input() hintText = 'Radera pass';

  @Output() delete = new EventEmitter<void>();

  hintVisible = false;
  private alertCtrl = inject(AlertController);

  ngOnInit(): void {
    console.log('🪪 label:', this.label);
    console.log('🗑️ iconName:', this.iconName);
    console.log('💬 hintText:', this.hintText || '– tomt –');
  }

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
