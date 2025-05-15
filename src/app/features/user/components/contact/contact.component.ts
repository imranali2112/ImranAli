import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { contactData, profileData } from '../../../../shared/interface/admin-interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../admin/services/contact-service/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileService } from '../../../admin/services/profile-service/profile.service';

@Component({
  selector: 'app-contact',
  imports: [MatFormFieldModule, MatProgressSpinnerModule, MatIconModule, MatInputModule, MatDividerModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  contactForm: FormGroup;
  isSuccess = false;
  isLoading: boolean = false;
  profileList: profileData[] = [];
  loadingProfiles: boolean = true;
  errorProfiles: any = null;


  constructor(private fb: FormBuilder, private contactService: ContactService, private snackBar: MatSnackBar, private profileService: ProfileService,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
      ]],
      subject: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9 .,@!?\'":()&/_-]+$')]],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
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
  
  onSubmit() {
    if (this.contactForm.invalid) return;
    this.isLoading = true;
    const formData: contactData = this.contactForm.value;

    this.contactService.sendMessage(formData)
      .then(() => {
        this.showSuccessMessage(); // show snackbar
        this.isSuccess = true;
        this.contactForm.reset();
        this.isLoading = false;

      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }

  showSuccessMessage() {
    this.snackBar.open('Message sent successfully!', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

}