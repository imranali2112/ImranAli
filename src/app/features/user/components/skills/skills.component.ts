import { Component } from '@angular/core';
import { skillData } from '../../../../shared/interface/admin-interface';
import { SkillService } from '../../../admin/services/skill-service/skill.service';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  skills: skillData[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private skillService: SkillService) { }

  ngOnInit(): void {
    this.fetchSkills();
  }

  fetchSkills(): void {
    this.skillService.getSkills().subscribe({
      next: (data) => {
        this.skills = data;
        this.isLoading = false;

        this.skills.forEach(skill => {
          console.log('Full skill object:', skill);
        });
      },
      error: (err) => {
        this.error = 'Failed to load skills.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

}
