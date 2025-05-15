import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { profileData } from '../../../../shared/interface/admin-interface';
import { ProfileService } from '../../services/profile-service/profile.service';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-profile',
  imports: [MatFormFieldModule, MatTabsModule, MatIconModule, MatInputModule, MatDividerModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],  // Fix typo from 'styleUrl' to 'styleUrls'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  selectedFile: File | null = null;
  imageBase64: string = '';
  profileList: profileData[] = [];
  loadingProfiles: boolean = true;
  errorProfiles: any = null;

  constructor(private fb: FormBuilder, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: ['', Validators.required],
      linkdIn: ['', Validators.required],
      fiverr: ['', Validators.required],
      github: ['', Validators.required],
      instagram: ['', Validators.required],
      facebook: ['', Validators.required],
      image: ['', Validators.required]
    });
    this.profileService.getProfiles().subscribe({
      next: (data) => {
        this.profileList = data;
        this.loadingProfiles = false;
      },
      error: (err) => {
        console.error('❌ Failed to load profile data:', err);
        this.errorProfiles = err;
        this.loadingProfiles = false;
      }
    });
  }

  onImageChange(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result as string;
      this.profileForm.patchValue({ image: this.imageBase64 });
    };
    reader.onerror = error => {
      console.error('Base64 conversion error:', error);
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const profilePayload: profileData = {
        ...this.profileForm.value,
        image: this.imageBase64
      };

      this.profileService.addProfile(profilePayload).subscribe({
        next: (res) => {
          console.log('Profile submitted successfully:', res);
          this.profileForm.reset();
          this.imageBase64 = '';
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Error submitting profile:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  deleteProfileItem(id: string, imageUrl?: string): void {
    if (!id) {
      console.error('ID is undefined. Cannot delete.');
      return;
    }

    if (confirm('Are you sure you want to delete this profile?')) {
      this.profileService.deleteProfile(id, imageUrl).subscribe({
        next: () => {
          console.log('✅ Profile deleted successfully');
        },
        error: (err: unknown) => {
          const message = err instanceof Error ? err.message : String(err);
          console.error('❌ Failed to delete profile:', message);
          alert('Failed to delete profile');
        }
      });
    }
  }
}
