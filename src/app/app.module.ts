import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getDataConnect, provideDataConnect } from '@angular/fire/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({ projectId: "strength-app-cd974", appId: "1:588939477744:web:16a9334867c35fde51f835", storageBucket: "strength-app-cd974.firebasestorage.app", apiKey: "AIzaSyCYCOMRjP5uw05meHp0S3TDPQjaSl2LPKs", authDomain: "strength-app-cd974.firebaseapp.com", messagingSenderId: "588939477744" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideDataConnect(() => getDataConnect(connectorConfig))],
  bootstrap: [AppComponent],
})
export class AppModule {}
