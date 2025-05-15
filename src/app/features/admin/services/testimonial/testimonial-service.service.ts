import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  query,
  orderBy,
  collectionData,
  getDocs,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { testimonialData } from '../../../../shared/interface/admin-interface';
import { LoadingServiceService } from '../loading/loading-service.service';

@Injectable({
  providedIn: 'root',
})
export class TestimonialServiceService {
  constructor(private firestore: Firestore, private loadingService: LoadingServiceService) {
    this.firestore = inject(Firestore);
  }

  sendTestimonial(testimonial: testimonialData): Observable<any> {
    const testimonialRef = collection(this.firestore, 'testimonials');
    return new Observable((observer) => {
      addDoc(testimonialRef, testimonial)
        .then((docRef) => observer.next(docRef))
        .catch((error) => observer.error(error));
    });
  }

  getTestimonials(): Observable<testimonialData[]> {
    const testimonialRef = collection(this.firestore, 'testimonials');
    const testimonialQuery = query(testimonialRef); // You can add ordering or filtering here if needed
    return collectionData(testimonialQuery, { idField: 'id' }) as Observable<testimonialData[]>;
  }



  deleteTestimonial(id: string): Promise<void> {
    const testimonialDocRef = doc(this.firestore, 'testimonials', id);
    return deleteDoc(testimonialDocRef);
  }

}