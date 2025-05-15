import { Injectable, NgZone } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AboutData } from '../../../../../shared/interface/admin-interface'; // make sure path is correct
import { Firestore, collection, addDoc, collectionData, query, orderBy, getDocs } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { LoadingServiceService } from '../../loading/loading-service.service';
import { deleteDoc, doc } from '@angular/fire/firestore';
import { deleteObject } from '@angular/fire/storage';
import { updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AboutService {
  constructor(private firestore: Firestore, private storage: Storage, private ngZone: NgZone, private loadingService: LoadingServiceService) { }

  async uploadImage(file: File): Promise<string> {
    try {
      const filePath = `about-images/${Date.now()}_${file.name}`;
      const imageRef = ref(this.storage, filePath);
      const result = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(result.ref);
      return downloadURL;
    } catch (error) {
      console.error('❌ Image upload failed:', error);
      throw error;
    }
  }

  // ✅ Changed to Observable
  addAbout(about: AboutData): Observable<any> {
    const aboutCollection = collection(this.firestore, 'about');
    return from(addDoc(aboutCollection, about));
  }

  getAbout(): Observable<AboutData[]> {
    const aboutRef = collection(this.firestore, 'about');
    const aboutQuery = query(aboutRef, orderBy('name'));
    return collectionData(aboutQuery, { idField: 'id' }) as Observable<AboutData[]>;
  }



  deleteAbout(id: string, imageUrl?: string): Observable<void> {

    const aboutDocRef = doc(this.firestore, `about/${id}`);
    const deletePromise = deleteDoc(aboutDocRef).then(async () => {
      if (imageUrl) {
        const imageRef = ref(this.storage, imageUrl);
        await deleteObject(imageRef);
      }
    }).catch(error => {
      throw error;
    });

    return from(deletePromise);
  }

  // editAbout(id: string, updatedData: Partial<AboutData>): Observable<void> {
  //   const aboutDocRef = doc(this.firestore, `about/${id}`);
  //   const updatePromise = updateDoc(aboutDocRef, updatedData);
  //   return from(updatePromise);
  // }
}
