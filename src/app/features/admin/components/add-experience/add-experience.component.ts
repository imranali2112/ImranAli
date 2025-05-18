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
import { MatTabsModule } from '@angular/material/tabs';
import { ExperienceData } from '../../../../shared/interface/admin-interface';
import { Timestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

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
    MatNativeDateModule,
    MatTabsModule,
    CommonModule,
  ],
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css'],
})
export class AddExperienceComponent {
  experienceForm: FormGroup;
  experiences: ExperienceData[] = [];

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

  async ngOnInit() {
    const data = await this.experienceService.getAllExperiences();

    this.experienceService.getAllExperiences().pipe(
      map(data =>
        data.map(exp => ({
          ...exp,
          startDate: (exp.startDate as unknown as Timestamp).toDate(),
          endDate: (exp.endDate as unknown as Timestamp).toDate(),
        }))
      )
    ).subscribe((processedData: ExperienceData[]) => {
      this.experiences = processedData;
    });
  }

  deleteExperience(id: string): void {
  if (confirm('Are you sure you want to delete this experience?')) {
    this.experienceService.deleteExperience(id)
      .then(() => {
        console.log('Experience deleted:', id);
        // Remove the deleted experience from the local array
        this.experiences = this.experiences.filter(exp => exp.id !== id);
      })
      .catch(error => {
        console.error('Error deleting experience:', error);
      });
  }
}

}