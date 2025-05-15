import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { projectData } from '../../../../shared/interface/admin-interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects-service/projects.service';
import { MatTabsModule } from '@angular/material/tabs';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-projects',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatTabsModule, MatIconModule, MatInputModule, MatDividerModule, MatButtonModule],
  templateUrl: './add-projects.component.html',
  styleUrl: './add-projects.component.css'
})
export class AddProjectsComponent {
  projectForm!: FormGroup;
  selectedFile: File | null = null;
  imageBase64: string = '';  // Holds base64 image string for DB
  imagePreviewUrl: string = '';  // For preview
  projects: projectData[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  isDeleting: string | null = null; // Track deleting status by project ID


  constructor(private fb: FormBuilder, private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      shortDescription: ['', [Validators.required, Validators.maxLength(50)]],
      fullDescription: ['', Validators.required],
      projectUrl: ['', Validators.required],
      projectImage: ['']  // Base64 image will be stored here
    });

    this.fetchProjects();
  }

  onImageChange(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result as string;
      this.projectForm.patchValue({ projectImage: this.imageBase64 });  // Embed base64 directly
      this.imagePreviewUrl = this.imageBase64;  // Show preview
      console.log('✅ Image converted to Base64');
    };
    reader.onerror = (err) => {
      console.error('❌ Base64 conversion failed:', err);
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.projectForm.valid && this.imageBase64) {
      const projectPayload: projectData = this.projectForm.value;

      this.projectService.addProject(projectPayload).subscribe({
        next: (res) => {
          console.log('✅ Project submitted with Base64 image:', res);
          this.projectForm.reset();
          this.imageBase64 = '';
          this.imagePreviewUrl = '';
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('❌ Submission failed:', err);
        }
      });
    } else {
      console.error('❌ Form is invalid or image not converted to Base64');
    }
  }

  fetchProjects(): void {
    this.projectService.getProjects().subscribe({
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

  deleteProject(projectId: string | undefined): void {
    if (!projectId) {
      console.error('❌ Project ID is undefined. Cannot delete.');
      return;
    }

    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).subscribe({
        next: () => {
          console.log('✅ Project deleted successfully');
          this.fetchProjects(); // Refresh the projects list after deletion
        },
        error: (err) => {
          console.error('❌ Error deleting project:', err);
          alert('Failed to delete the project. Please try again.');
        }
      });
    }
  }
}





