import { Component } from '@angular/core';
import { projectData } from '../../../../../shared/interface/admin-interface';
import { ProjectsService } from '../../../../admin/services/projects-service/projects.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingServiceService } from '../../../../admin/services/loading/loading-service.service';

@Component({
  selector: 'app-project-detail',
  imports: [],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
   
  projectId: string = '';
  project!: projectData;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private loadingService: LoadingServiceService
    
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';

    if (this.projectId) {
      this.fetchProjectById(this.projectId);
    } else {
      this.errorMessage = 'No project ID provided.';
      this.isLoading = false;
    }
  }

  fetchProjectById(id: string): void {
    this.loadingService.show();
    this.projectsService.getProjectById(id).subscribe({
      next: (data) => {
        this.project = data;
        this.loadingService.hide();
      },
      error: (err) => {
        console.error('❌ Error fetching project:', err);
        this.errorMessage = 'Failed to load project details.';
        this.loadingService.hide();
      }
    });
  }
}
