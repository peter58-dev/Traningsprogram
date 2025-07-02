import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { MessageListComponent } from '../components/message-list/message-list.component';

import { HomePageRoutingModule } from './home-routing.module';
import { MessageFormComponent } from '../components/message-form/message-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, ReactiveFormsModule],
  declarations: [HomePage, MessageListComponent, MessageFormComponent],
})
export class HomePageModule {}
