import { Injectable } from '@angular/core';
import { ExperienceData } from '../../../../shared/interface/admin-interface';
import { Firestore, Timestamp, addDoc, collection, collectionData, getDocs, orderBy, query, serverTimestamp } from '@angular/fire/firestore';
 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  constructor(private firestore: Firestore) {}

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

  async getAllExperiences(): Promise<ExperienceData[]> {
    try {
      const snapshot = await getDocs(query(collection(this.firestore, 'experiences')));
      const experiences: ExperienceData[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ExperienceData[];
      return experiences;
    } catch (error) {
      console.error('Error fetching all experiences:', error);
      throw new Error('Failed to fetch all experiences');
    }
  }
  
   
}