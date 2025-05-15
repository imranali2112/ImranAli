import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillService } from '../../services/skill-service/skill.service';
import { skillData } from '../../../../shared/interface/admin-interface';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-add-skills',
  imports: [MatFormFieldModule, MatTabsModule, MatIconModule, MatInputModule, MatDividerModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-skills.component.html',
  styleUrl: './add-skills.component.css'

})
export class AddSkillsComponent {
  skillForm!: FormGroup;
  selectedFile: File | null = null;
  imageBase64: string = '';
  imagePreviewUrl: string = '';
  skills: skillData[] = [];
  error: string = '';


  constructor(
    private fb: FormBuilder,
    private skillService: SkillService
  ) { }

  ngOnInit(): void {
    this.skillForm = this.fb.group({
      title: ['', Validators.required],
      imageUrl: ['']  // Base64 will be patched here
      
    });

    this.fetchSkills();
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result as string;
      this.imagePreviewUrl = this.imageBase64;
      this.skillForm.patchValue({ imageUrl: this.imageBase64 });
      console.log('✅ Image converted to Base64 and patched');
    };
    reader.onerror = (err) => {
      console.error('❌ Failed to convert image to Base64:', err);
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.skillForm.valid && this.imageBase64) {
      const skillPayload: skillData = this.skillForm.value;

      this.skillService.addSkill(skillPayload).subscribe({
        next: () => {
          console.log('✅ Skill added with Base64 image');
          this.skillForm.reset();
          this.selectedFile = null;
          this.imageBase64 = '';
          this.imagePreviewUrl = '';
        
        },
        error: (error) => {
          console.error('❌ Failed to add skill:', error);
        }
      });
    } else {
      console.warn('⚠️ Form is invalid or image missing');
    }
  }

  fetchSkills(): void {

    this.skillService.getSkills().subscribe({
      next: (data) => {
        this.skills = data;

        this.skills.forEach(skill => {
          console.log('Full skill object:', skill);
        });
      },
      error: (err) => {
        this.error = 'Failed to load skills.';
        console.error(err);
      }
    });
  }
  onDeleteSkill(skillId: string | undefined): void {
    if (!skillId) {
      console.error('❌ Skill ID is undefined. Cannot delete.');
      return;
    }

    if (confirm('Are you sure you want to delete this skill?')) {
      this.skillService.deleteSkill(skillId).subscribe({
        next: () => {
          console.log('✅ Skill deleted successfully');
          this.fetchSkills(); // Refresh the skills list after deletion
        },
        error: (err) => {
          console.error('❌ Error deleting skill:', err);
          alert('Failed to delete the skill. Please try again.');
        }
      });
    }
  }
}

