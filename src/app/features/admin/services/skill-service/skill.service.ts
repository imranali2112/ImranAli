import { Injectable, NgZone } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, orderBy, query, collectionData, doc, deleteDoc } from '@angular/fire/firestore'; // ✅ 1: AngularFire SDK
import { skillData } from '../../../../shared/interface/admin-interface';
import { Observable } from 'rxjs';
import { ref, uploadBytes, getDownloadURL, getStorage } from '@angular/fire/storage'; // ✅ 2: getStorage() used explicitly
import { LoadingServiceService } from '../loading/loading-service.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private firestore: Firestore,
    private ngZone: NgZone,
    private loadingService: LoadingServiceService
  ) { }

  // ✅ Upload image using getStorage() + skillImage/ prefix
  async uploadImage(file: File): Promise<string> {
    try {
      const storage = getStorage(); // ✅ 2, 4
      const filePath = `skillImage/${Date.now()}_${file.name}`; // ✅ 4
      const imageRef = ref(storage, filePath); // ✅ 3
      const result = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(result.ref);
      return downloadURL;
    } catch (error) {
      console.error('❌ Failed to upload image:', error);
      throw error;
    }
  }

  // ✅ Add new skill document
  addSkill(skill: skillData): Observable<any> {
    return new Observable((observer) => {
      const skillCollection = collection(this.firestore, 'skills');
      addDoc(skillCollection, skill)
        .then((docRef) => {
          this.ngZone.run(() => {
            observer.next(docRef);
            observer.complete();
          });
        })
        .catch((error) => {
          console.error('❌ Error adding skill:', error);
          observer.error(error);
        });
    });
  }

  // ✅ Get skills with NgZone.run() inside .then()
  getSkills(): Observable<skillData[]> {
    const skillRef = collection(this.firestore, 'skills');
    const skillQuery = query(skillRef, orderBy('title'));

    return collectionData(skillQuery, { idField: 'id' }) as Observable<skillData[]>;
  }


  deleteSkill(skillId: string): Observable<void> {
    return new Observable<void>((observer) => {
      const skillDocRef = doc(this.firestore, `skills/${skillId}`);
      deleteDoc(skillDocRef)
        .then(() => {
          this.ngZone.run(() => {
            observer.next();
            observer.complete();
            console.log(`✅ Skill with ID '${skillId}' deleted.`);
          });
        })
        .catch((error) => {
          console.error('❌ Error deleting skill:', error);
          observer.error(error);
        });
    });
  }
}
