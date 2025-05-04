import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { AdminInterface } from '../../../../shared/interface/admin-interface';  // Correct path

@Component({
  selector: 'app-profile',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatDividerModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],  // Fix typo from 'styleUrl' to 'styleUrls'
})
export class ProfileComponent {
  profileForm!: FormGroup;
  file: File | null = null; // Store the selected file

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      description: ['', Validators.required],
      linkdIn: ['', Validators.required],
      fiverr: ['', Validators.required],
      github: ['', Validators.required],
      instagram: ['', Validators.required],
      facebook: ['', Validators.required],
      CV: [null, Validators.required], // Allow file input
      image: ['', Validators.required], // Assuming image URL
    });
  }

  // File selected
  onFileSelected(event: any) {
    this.file = event.target.files[0]; // Get the selected file
  }

  // Submit form
  onSubmit() {
    if (this.profileForm.valid && this.file) {
      const profileData: AdminInterface = this.profileForm.value; // Extract form values
    } else {
      console.log('Form is invalid or file not selected');
    }
  }
}
