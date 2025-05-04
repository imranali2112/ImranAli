import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, addDoc, CollectionReference, DocumentData, getDocs, query, getDoc, doc, } from '@angular/fire/firestore';
import { AdminInterface, serviceData } from '../../../../shared/interface/admin-interface';

@Injectable({
  providedIn: 'root'
})
export class AddServiceService {
  private firestore = inject(Firestore);

  services = signal<serviceData[]>([]);
  loading = signal(false);
  errorOccurred = signal<string | null>(null);

  constructor() { }

  // Function to add a service to Firestore
  addService(service: AdminInterface): Promise<any> {
    const serviceCollection = collection(this.firestore, 'service') as CollectionReference<DocumentData>;
    return addDoc(serviceCollection, service);
  }

  // Function to get all services (replaces Observable version with async/await)
  async getServices(): Promise<serviceData[]> {
    this.loading.set(true);
    this.errorOccurred.set(null);

    try {
      const snapshot = await getDocs(query(collection(this.firestore, 'service')));
      const services: serviceData[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as serviceData[];

      this.services.set(services);
      return services;
    } catch (error) {
      console.error('Error fetching services:', error);
      this.errorOccurred.set('Failed to fetch services.');
      throw new Error('Failed to fetch services');
    } finally {
      this.loading.set(false);
    }
  }
  async getServiceById(id: string): Promise<serviceData | null> {
    try {
      const docRef = doc(this.firestore, 'service', id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as serviceData;
      }
      return null;
    } catch (error) {
      console.error('Error fetching single service:', error);
      this.errorOccurred.set('Failed to fetch service');
      return null;
    }
  }
}
