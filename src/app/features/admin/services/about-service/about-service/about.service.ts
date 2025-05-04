import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { AdminInterface } from '../../../../../shared/interface/admin-interface';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';


import { getStorage, Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  

  constructor(private firestore: Firestore, private storage: Storage) {}

  uploadImage(path: string, file: File) {
    const storageRef = ref(this.storage, path);
    return uploadBytes(storageRef, file);
  }

  addProject(project: AdminInterface): Promise<any> {
    const projectCollection = collection(this.firestore, 'projects');
    return addDoc(projectCollection, project);
  }
  

  getProjects(): Observable<AdminInterface[]> {
    const projectCollection = collection(this.firestore, 'projects');
    return collectionData(projectCollection, { idField: 'id' }) as Observable<AdminInterface[]>;
  }
}
