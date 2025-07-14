import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPagePageRoutingModule } from './test-page-routing.module';

import { TestPagePage } from './test-page.page';
import { TestModalComponent } from '../../modal/test-modal/test-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TestPagePageRoutingModule, TestModalComponent],
  declarations: [TestPagePage],
})
export class TestPagePageModule {}
