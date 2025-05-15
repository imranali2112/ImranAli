import { Component } from '@angular/core';
import { ExperienceData } from '../../../../shared/interface/admin-interface';
import { ExperienceService } from '../../../admin/services/experience-service/experience.service';
import { CommonModule } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore'; 
import { map } from 'rxjs';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
   experiences: ExperienceData[] = [];

  constructor(private experienceService: ExperienceService) {}

  ngOnInit() {
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
}
