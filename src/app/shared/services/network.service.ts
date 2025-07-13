import { Injectable, signal } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private isOnlineSignal = signal(navigator.onLine);

  constructor(private toastCtrl: ToastController) {
    window.addEventListener('online', () => {
      this.isOnlineSignal.set(true);
    });

    window.addEventListener('offline', () => {
      this.isOnlineSignal.set(false);
      this.showOfflineToast();
    });
  }

  isOnline(): boolean {
    return this.isOnlineSignal();
  }

  getSignal() {
    return this.isOnlineSignal;
  }

  private async showOfflineToast() {
    const toast = await this.toastCtrl.create({
      message: 'Du är offline. Datan sparas lokalt.',
      duration: 3000,
      position: 'bottom',
      color: 'warning',
    });
    await toast.present();
  }
}
