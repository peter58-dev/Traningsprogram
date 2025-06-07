import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProgramPageRoutingModule } from './list-program-routing.module';

import { ListProgramPage } from './list-program.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProgramPageRoutingModule
  ],
  declarations: [ListProgramPage]
})
export class ListProgramPageModule {}
