import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, addDoc, CollectionReference, DocumentData, getDocs } from '@angular/fire/firestore';
import { contactData } from '../../../../shared/interface/admin-interface';
 
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private firestore = inject(Firestore);

  contacts = signal<contactData[]>([]);
  loading = signal(false);
  errorOccurred = signal<string | null>(null);

  constructor() {}

  // Function to add contact form data to Firestore
  sendMessage(contact: contactData): Promise<any> {
    const contactCollection = collection(this.firestore, 'contact') as CollectionReference<DocumentData>;
    return addDoc(contactCollection, contact);
  }

  async getMessages(): Promise<void> {
    this.loading.set(true);
    this.errorOccurred.set(null);

    try {
      const contactCollection = collection(this.firestore, 'contact') as CollectionReference<DocumentData>;
      const snapshot = await getDocs(contactCollection);

      const messages: contactData[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as contactData)
      }));

      this.contacts.set(messages);
    } catch (error: any) {
      this.errorOccurred.set('Failed to fetch messages: ' + error.message);
    } finally {
      this.loading.set(false);
    }
  }
}
