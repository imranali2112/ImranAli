import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AboutService } from '../../services/about-service/about-service/about.service';
import { AdminInterface } from '../../../../shared/interface/admin-interface';
import { getStorage, Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add-about',
  imports: [MatIconModule, MatInputModule, MatDividerModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-about.component.html',
  styleUrl: './add-about.component.css'
})
export class AddAboutComponent {
  aboutForm!: FormGroup;
  selectedFile: File | null = null;
  selectedImageFile: File | null = null;
  base64Image: string = '';

  constructor(
    private fb: FormBuilder,
    private projectService: AboutService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.aboutForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      experience: ['', Validators.required],
      projects: [0, [Validators.required, Validators.min(1)]],
      clients: ['', Validators.required],
      imageUrl: ['', Validators.required]  
    });
  }



  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedImageFile = file;
        this.base64Image = reader.result as string;
        console.log("Image converted to Base64:", this.base64Image);
      };

      reader.readAsDataURL(file);  // This will trigger the load event with base64
    }
  }



  onSubmit(): void {
    if (this.aboutForm.valid && this.base64Image) {
      const base64 = this.base64Image;

      if (!base64.includes(',')) {
        console.error('Base64 string is invalid.');
        return;
      }

      const base64Data = base64.split(',')[1];  // Get only the actual base64 part

      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const fileBlob = new Blob([byteArray], { type: 'image/jpeg' });

      const fileName = `about-images/${uuidv4()}.jpg`;
      const storageRef = ref(this.storage, fileName);

      uploadBytes(storageRef, fileBlob).then(() => {
        return getDownloadURL(storageRef);
      }).then((downloadURL) => {
        const project: AdminInterface = {
          ...this.aboutForm.value,
          imageUrl: downloadURL
        };

        return this.projectService.addProject(project);
      }).then(() => {
        console.log('Project added successfully with image!');
        this.aboutForm.reset();
        this.base64Image = '';
      }).catch(err => {
        console.error('Error uploading image or saving project:', err);
      });

    } else {
      console.error('Form is invalid or image not selected');
    }
  }
}
