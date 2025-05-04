import { Component } from '@angular/core';
import { ExperienceData } from '../../../../shared/interface/admin-interface';
import { ExperienceService } from '../../../admin/services/experience-service/experience.service';
import { CommonModule } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore'; 

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  experiences: ExperienceData[] = [];

  constructor(private experienceService: ExperienceService) {}

  async ngOnInit() {
    const data = await this.experienceService.getAllExperiences();

    this.experiences = data.map(exp => ({
      ...exp,
      // Safely convert Firestore Timestamp to JS Date
      startDate: (exp.startDate as unknown as Timestamp).toDate(),
      endDate: (exp.endDate as unknown as Timestamp).toDate(),
    }));
  }
}
