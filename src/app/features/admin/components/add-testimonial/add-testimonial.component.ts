import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { testimonialData } from '../../../../shared/interface/admin-interface';
import { TestimonialServiceService } from '../../services/testimonial/testimonial-service.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-add-testimonial',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  templateUrl: './add-testimonial.component.html',
  styleUrl: './add-testimonial.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTestimonialComponent {
  testimonialForm: FormGroup;
  successMessage = '';
  testimonials: testimonialData[] = [];

  constructor(
    private fb: FormBuilder,
    private testimonialService: TestimonialServiceService
  ) {
    this.testimonialForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      name: ['', [Validators.required]],
      companyName: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.testimonialForm.invalid) return;

    const testimonial: testimonialData = this.testimonialForm.value;
    this.testimonialService.sendTestimonial(testimonial).subscribe({
      next: () => {
        this.successMessage = 'Testimonial submitted successfully!';
        this.testimonialForm.reset();
      },
      error: (err: unknown) => {
        if (err instanceof Error) {
          console.error('Submission failed:', err.message);
        } else {
          console.error('Submission failed:', err);
        }
      }
    });
  }

  ngOnInit(): void {
    // Subscribe to the testimonials observable
    this.testimonialService.getTestimonials().subscribe({
      next: (data) => {
        this.testimonials = data; // Updated in real time
      },
      error: (err) => {
        console.error('Error loading testimonials:', err);
      }
    });
  }

  deleteTestimonial(id: string): void {
  if (confirm('Are you sure you want to delete this testimonial?')) {
    this.testimonialService.deleteTestimonial(id)
      .then(() => {
        console.log('Testimonial deleted:', id);

        // **Remove the deleted testimonial from the local array immediately**
        this.testimonials = this.testimonials.filter(testimonial => testimonial.id !== id);
      })
      .catch(error => {
        console.error('Error deleting testimonial:', error);
      });
  }
}

}
