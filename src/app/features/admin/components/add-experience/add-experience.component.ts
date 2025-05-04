import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExperienceService } from '../../services/experience-service/experience.service';

@Component({
  selector: 'app-add-experience',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent {
  experienceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService
  ) {
    this.experienceForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  async onSubmit() {
    if (this.experienceForm.valid) {
      try {
        const id = await this.experienceService.addExperience({
          title: this.experienceForm.value.title,
          description: this.experienceForm.value.description,
          startDate: this.experienceForm.value.startDate,
          endDate: this.experienceForm.value.endDate
        });
        
        console.log('Experience added with ID: ', id);
        this.experienceForm.reset();
      } catch (error) {
        console.error('Error adding experience: ', error);
      }
    }
  }
}