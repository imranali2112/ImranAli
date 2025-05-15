import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AboutService } from '../../services/about-service/about-service/about.service';
import { AboutData } from '../../../../shared/interface/admin-interface';
import { Storage } from '@angular/fire/storage';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-about',
  templateUrl: './add-about.component.html',
  styleUrl: './add-about.component.css',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTabsModule
  ]
})
export class AddAboutComponent {
  aboutForm!: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string = '';
  aboutList: AboutData[] = [];
  errorAbout: any = null;
  loadingAbout: boolean = true;

  constructor(
    private fb: FormBuilder,
    private aboutService: AboutService,
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.aboutForm = this.fb.group({
      name: ['', Validators.required],
      frontEnd: ['', Validators.required],
      backEnd: ['', Validators.required],
      education: ['', Validators.required],
      experience: [0, [Validators.required, Validators.min(1)]],
      projects: [0, [Validators.required, Validators.min(1)]],
      clients: [0, Validators.required],
      imageUrl: ['', Validators.required]
    });

    this.aboutService.getAbout().subscribe({
      next: (data) => {
        this.aboutList = data;
        this.loadingAbout = false;
      },
      error: (err) => {
        console.error('❌ Failed to load about data:', err);
        this.errorAbout = err;
        this.loadingAbout = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      this.aboutForm.patchValue({ imageUrl: this.imageUrl });
      console.log('Image converted to Base64');
    };
    reader.onerror = (error) => {
      console.error('Base64 conversion error:', error);
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.aboutForm.valid) {
      const formData: AboutData = {
        ...this.aboutForm.value,
        imageUrl: this.imageUrl
      };

      this.aboutService.addAbout(formData).subscribe({
        next: () => {
          console.log('About info added successfully!');
          this.aboutForm.reset();
          this.imageUrl = '';
        },
        error: (err) => {
          console.error('Error saving about info:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  deleteAboutItem(id: string | undefined, imageUrl?: string) {
    if (!id) {
      console.error('ID is undefined. Cannot delete.');
      return;
    }

    if (confirm('Are you sure you want to delete this item?')) {
      this.aboutService.deleteAbout(id, imageUrl).subscribe({
        next: () => {
          console.log('About item deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting:', err);
          alert('Failed to delete item');
        }
      });
    }
  }

  // updateAboutEntry(id: string | undefined, updatedFields: Partial<AboutData>) {
  //   console.log('🛠️ Edit button clicked, ID:', id, 'Data:', updatedFields);

  //   if (!id) {
  //     console.error('❌ ID is missing, cannot update.');
  //     return;
  //   }

  //   // Optional: compare with updatedFields.id if it exists
  //   if (updatedFields.id && updatedFields.id !== id) {
  //     console.error(`❌ Mismatched IDs. Provided ID: ${id}, Updated data ID: ${updatedFields.id}`);
  //     return;
  //   }

  //   this.aboutService.editAbout(id, updatedFields).subscribe({
  //     next: () => {
  //       console.log('✅ About data updated successfully');
  //     },
  //     error: (err) => {
  //       console.error('❌ Failed to update About data:', err);
  //     }
  //   });
  // }
}
