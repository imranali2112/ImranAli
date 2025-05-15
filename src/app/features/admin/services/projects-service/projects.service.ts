import { Injectable, NgZone } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, orderBy, doc, getDoc, collectionData, docData } from '@angular/fire/firestore'; // Use Angular Fire's Firestore
import { Storage, ref, uploadBytes, getDownloadURL, getStorage } from '@angular/fire/storage'; // Use Angular Fire's Storage
import { projectData } from '../../../../shared/interface/admin-interface';
import { catchError, from, map, Observable } from 'rxjs';
import { LoadingServiceService } from '../loading/loading-service.service';
import { deleteDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private ngZone: NgZone,
    private loadingService: LoadingServiceService
  ) { }

  // ✅ Upload project image with try-catch and inline .catch()
  async uploadImage(file: File): Promise<string> {
    try {
      const storage = getStorage();
      const filePath = `projectImages/${Date.now()}_${file.name}`;
      const fileRef = ref(storage, filePath);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('❌ Image upload failed:', error);
      return Promise.reject(error); // inline .catch() handled wherever used
    }
  }

  // ✅ Add new project
  addProject(project: projectData): Observable<any> {
    return new Observable((observer) => {
      const projectsCollection = collection(this.firestore, 'projects');
      addDoc(projectsCollection, project)
        .then((docRef) => {
          this.ngZone.run(() => {
            observer.next(docRef);
            observer.complete();
          });
        })
        .catch((error) => {
          console.error('❌ Error adding project:', error);
          observer.error(error);
        });
    });
  }

  // ✅ Get all projects using custom Observable and zone-safe NgZone.run()
  getProjects(): Observable<projectData[]> {
    this.loadingService.show();

    const projectsRef = collection(this.firestore, 'projects');
    const projectsQuery = query(projectsRef, orderBy('title'));

    // Real-time updates using collectionData
    const projects$ = collectionData(projectsQuery, { idField: 'id' }) as Observable<projectData[]>;

    return new Observable((observer) => {
      const subscription = projects$.subscribe({
        next: (projects) => {
          this.loadingService.hide();
          observer.next(projects);
        },
        error: (error) => {
          this.loadingService.hide();
          console.error('❌ Error getting real-time projects:', error);
          observer.error(error);
        },
        complete: () => {
          observer.complete();
        }
      });

      // Clean up the subscription when Observable is unsubscribed
      return () => subscription.unsubscribe();
    });
  }

  getProjectById(id: string): Observable<projectData> {
    const projectDocRef = doc(this.firestore, 'projects', id);
    return docData(projectDocRef, { idField: 'id' }) as Observable<projectData>;
  }




  // ✅ Delete a project by ID
  deleteProject(projectId: string): Observable<void> {
    return new Observable((observer) => {
      const projectDocRef = doc(this.firestore, `projects/${projectId}`);

      this.loadingService.show();

      from(deleteDoc(projectDocRef)).subscribe({
        next: () => {
          this.loadingService.hide();
          observer.next();
          observer.complete();
        },
        error: (error) => {
          this.loadingService.hide();
          console.error('❌ Error deleting project:', error);
          observer.error(error);
        }
      });
    });
  }
}
