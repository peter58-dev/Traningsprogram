import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExerciseModalComponent } from 'src/app/features/modals/exercise-modal/exercise-modal.component';
import { ExerciseService } from 'src/app/features/services/exercise.service';
import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-workout-session',
  templateUrl: './workout-session.page.html',
  standalone: false,
  styleUrls: ['./workout-session.page.scss'],
})
/**
 * Komponent för sidan där användaren hanterar en träningssession.
 * Initialiserar övningslyssnaren och visar modal för att lägga till nya övningar.
 */
export class WorkoutSessionPage implements OnInit, OnDestroy {
  /**
   * @param exerciseService Service för hantering av övningar (CRUD, synkning).
   * @param modalCtrl Hanterar öppning/stängning av modal-vyer.
   */
  constructor(
    private exerciseService: ExerciseService,
    private modalCtrl: ModalController
  ) {}

  /**
   * Livscykel-hook som initierar lyssnare på övningsdata vid sidans start.
   */
  ngOnInit(): void {
    this.exerciseService.initExerciseListener();
  }

  /**
   * Livscykel-hook som stänger ner övningslyssnaren när sidan förstörs.
   */
  ngOnDestroy(): void {
    this.exerciseService.stopExerciseListener();
  }

  /**
   * Öppnar en modal för att skapa en ny övning.
   * Om användaren matar in namn, sparas övningen via ExerciseService.
   */
  async openExerciseModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ExerciseModalComponent,
      backdropDismiss: true,
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data?.trim()) {
      const newExercise: Omit<Exercise, 'id'> = {
        exerciseName: data.trim(),
        sets: [],
      };

      try {
        await this.exerciseService.addExercise(newExercise);
      } catch (error) {
        console.error('Kunde inte lägga till övningen:', error);
      }
    }
  }
}
