import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExerciseModalComponent } from 'src/app/features/modals/exercise-modal/exercise-modal.component';
import { ExerciseService } from '../../../../shared/services/exercise.service';
import { Exercise } from '../../../../shared/models/exercise.model';
import { ActivatedRoute } from '@angular/router';

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
  programId: string | undefined;
  /**
   * @param exerciseService Service för hantering av övningar (CRUD, synkning).
   * @param modalCtrl Hanterar öppning/stängning av modal-vyer.
   */

  /**
   * @param exerciseService Service för hantering av övningar (CRUD, synkning).
   * @param modalCtrl Hanterar öppning/stängning av modal-vyer.
   */
  constructor(
    private exerciseService: ExerciseService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute
  ) {}

  /**
   * Livscykel-hook som initierar lyssnare på övningsdata vid sidans start.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('programId');
    if (id) {
      this.programId = id;
      this.exerciseService.initExerciseListener(this.programId);
    } else {
      console.warn('⚠️ programId saknas i routing');
    }
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
      cssClass: 'modal-base',
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
        const programId = this.route.snapshot.paramMap.get('programId');
        if (programId && newExercise) {
          await this.exerciseService.addExercise(programId, newExercise);
        }
      } catch (error) {
        console.error('Kunde inte lägga till övningen:', error);
      }
    }
  }
}
