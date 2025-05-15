import { Component } from '@angular/core';
import { contactData, projectData } from '../../../../shared/interface/admin-interface';
import { ProjectsService } from '../../../admin/services/projects-service/projects.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: projectData[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Failed to load projects:', error);
        this.errorMessage = 'Failed to load projects. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
