import { bootstrapApplication } from '@angular/platform-browser'; 
import { appConfig } from './app/app.config';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';


bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ] 
}).catch((err) => console.error(err));

