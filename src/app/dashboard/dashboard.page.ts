import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ProgramService } from '../shared/services/program.service';
import { Router } from '@angular/router';
import { AppStateService } from '../shared/services/app-state.service';
import { NetworkService } from '../shared/services/network.service';
import { AddWorkoutComponent } from '../workout/components/add-workout/add-workout.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  // lastUrl: string | null = null;
  lastVisitedUrl = this.appState.lastVisitedUrl;
  // Gör signalen tillgänglig i templaten
  networkStatus = this.networkService.getSignal();

  constructor(
    private modalCtrl: ModalController,
    private workoutService: ProgramService,
    private router: Router,
    private toastCtrl: ToastController,
    private appState: AppStateService,
    public networkService: NetworkService
  ) {}

  ngOnInit(): void {
    // Om du vill agera direkt vid offline – till exempel logga eller ladda något från cache
    if (!this.networkStatus()) {
      console.log('Offline-läge aktiv – laddar från lokal cache');
    }
  }

  async showProgramSavedToast() {
    const toast = await this.toastCtrl.create({
      message: 'Program tillagt!',
      duration: 1200,
      position: 'middle',
      cssClass: 'green-toast',
    });

    await toast.present();

    // Vänta på att toasten försvinner
    return toast.onDidDismiss();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddWorkoutComponent,
      backdropDismiss: true,
      cssClass: 'modal-home',
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      try {
        await this.workoutService.addProgram(data);
        console.log('Program saved to Firestore');

        await this.showProgramSavedToast(); // Vänta toasten klart

        this.router.navigate(['/workouts']); // Navigera EFTER toasten är klar
      } catch (error) {
        console.error('Error saving program to Firestore:', error);
      }
    }
  }

  showWorkoutsList() {
    console.log('lista visas');
  }
}
