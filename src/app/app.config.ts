import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environments/environment.development';


const firebaseConfig = {
  // apiKey: "AIzaSyB6h6rtopYa1WkQywriFFpciPaYBCea5yA",
  // authDomain: "indiamartchat-b4b82.firebaseapp.com",
  
  // projectId: "indiamartchat-b4b82",
  // storageBucket: "indiamartchat-b4b82.firebasestorage.app",
  // messagingSenderId: "164068011908",
  // appId: "1:164068011908:web:ddb7c9ebabf0816fe477d1",
  // measurementId: "G-BXZQ67QMLK",
  // databaseURL: "https://indiamartchat-b4b82-default-rtdb.firebaseio.com/"


  apiKey: "AIzaSyA_hiqxmaOggZSYp0SL_PsGVnkvVKO6QAU",
  authDomain: "testchat1-2c0c8.firebaseapp.com",
  
  projectId: "testchat1-2c0c8",
  storageBucket: "testchat1-2c0c8.firebasestorage.app",
  messagingSenderId: "252376561774",
  appId: "1:252376561774:web:fe1f94552c023640fe8e7f",
  measurementId: "G-FWL31EF85H",
  databaseURL: "https://testchat1-2c0c8-default-rtdb.firebaseio.com/",
};

// const app = initializeApp(firebaseConfig)
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),
    //  provideAnimationsAsync(),
    provideFirebaseApp(()=>initializeApp(firebaseConfig)),
    // AngularFireModule.initializeApp(environment.firebase),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig},
     provideAuth(()=>getAuth()),
     provideDatabase(()=> getDatabase()),
     
    ],
};
