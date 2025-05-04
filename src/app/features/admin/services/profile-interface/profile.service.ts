import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore'; 
import { addDoc, collection } from 'firebase/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { AdminInterface } from '../../../../shared/interface/admin-interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private firestore: Firestore, private storage: Storage) { }

  async addProfile(profile: AdminInterface, file: File): Promise<any> {
    try {
      // Step 1: Upload the file to Firebase Storage
      const filePath = `profile_pics/${file.name}`;
      const fileRef = ref(this.storage, filePath);
      
      // Upload the file
      await uploadBytes(fileRef, file);
      
      // Step 2: Get the download URL of the uploaded file
      const fileURL = await getDownloadURL(fileRef);
      
      // Step 3: Add the profile data along with the file URL to Firestore
      const profileCollection = collection(this.firestore, 'profile');
      return addDoc(profileCollection, { ...profile, image: fileURL });
    } catch (error) {
      console.error('Error uploading file: ', error);
      throw new Error('File upload failed!');
    }
  }

  // addProfile(profile: AdminInterface): Promise<any> {
  //   const profileCollection = collection(this.firestore, 'profile');
  //   return addDoc(profileCollection, profile);
  // }
}
