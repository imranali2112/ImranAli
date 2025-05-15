import { Injectable } from '@angular/core';
import { ExperienceData } from '../../../../shared/interface/admin-interface';
import { Firestore, Timestamp, addDoc, collection, collectionData, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { LoadingServiceService } from '../loading/loading-service.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  constructor(private firestore: Firestore, private loadingService: LoadingServiceService) { }

  async addExperience(experience: Omit<ExperienceData, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'experiences'), {
        ...experience,
        startDate: this.convertToTimestamp(experience.startDate),
        endDate: this.convertToTimestamp(experience.endDate),
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding experience: ', error);
      throw error;
    }
  }

  private convertToTimestamp(date: Date | string): Timestamp {
    if (typeof date === 'string') {
      return Timestamp.fromDate(new Date(date));
    }
    return Timestamp.fromDate(date);
  }

  getAllExperiences(): Observable<ExperienceData[]> {
    const experiencesRef = collection(this.firestore, 'experiences');
    const experiencesQuery = query(experiencesRef); // You can add ordering or filtering here if needed
    return collectionData(experiencesQuery, { idField: 'id' }) as Observable<ExperienceData[]>;
  }
  deleteExperience(id: string): Promise<void> {
    const expDocRef = doc(this.firestore, 'experiences', id);
    return deleteDoc(expDocRef);
  }
}