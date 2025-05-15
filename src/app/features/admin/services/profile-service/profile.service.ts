import { Injectable, NgZone } from '@angular/core';
import { Observable, from, of, map, switchMap, catchError } from 'rxjs';
import { Firestore, collection, addDoc, doc, getDoc, query, orderBy, getDocs, collectionData } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { profileData } from '../../../../shared/interface/admin-interface';
import { deleteDoc } from '@angular/fire/firestore';
import { deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private firestore: Firestore, private storage: Storage, private ngZone: NgZone) { }

  // ✅ Upload image using async/await like AboutService
  async uploadImage(file: File): Promise<string> {
    try {
      const filePath = `profile-images/${Date.now()}_${file.name}`;
      const imageRef = ref(this.storage, filePath);
      const result = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(result.ref);
      return downloadURL;
    } catch (error) {
      console.error('❌ Image upload failed:', error);
      throw error;
    }
  }

  addProfile(profile: profileData): Observable<any> {
    const profilesCollection = collection(this.firestore, 'profiles');
    return from(addDoc(profilesCollection, profile)).pipe(
      catchError((error) => {
        console.error('❌ Error adding profile:', error);
        throw error;
      })
    );
  }

  getProfiles(): Observable<profileData[]> {
    const profilesRef = collection(this.firestore, 'profiles');
    const profilesQuery = query(profilesRef, orderBy('name'));
    return collectionData(profilesQuery, { idField: 'id' }) as Observable<profileData[]>;
  }

  getProfileById(id: string): Observable<profileData | null> {
    const profileRef = doc(this.firestore, `profiles/${id}`);
    return from(getDoc(profileRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() as profileData };
        } else {
          return null;
        }
      }),
      catchError((error) => {
        console.error('❌ Error getting profile by ID:', error);
        throw error;
      })
    );
  }

  deleteProfile(id: string, imageUrl?: string): Observable<void> {
    const profileDocRef = doc(this.firestore, `profiles/${id}`);

    return from(deleteDoc(profileDocRef)).pipe(
      switchMap(() => {
        // If an image URL is provided, delete the image from storage
        if (imageUrl) {
          const imageRef = ref(this.storage, imageUrl);
          return from(deleteObject(imageRef)).pipe(
            catchError((err) => {
              console.warn('⚠️ Image deletion failed:', err);
              return of(undefined); // Don't fail the entire deletion process
            })
          );
        } else {
          return of(undefined); // No image to delete
        }
      }),
      catchError((error) => {
        console.error('❌ Error deleting profile:', error);
        throw error;
      })
    );
  }
}