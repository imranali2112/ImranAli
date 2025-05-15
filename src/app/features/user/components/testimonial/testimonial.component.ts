import { Component, OnInit } from '@angular/core';
import { testimonialData } from '../../../../shared/interface/admin-interface';
import { TestimonialServiceService } from '../../../admin/services/testimonial/testimonial-service.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  testimonials: testimonialData[] = [];

  constructor(private testimonialService: TestimonialServiceService) {}

  ngOnInit(): void {
    this.testimonialService.getTestimonials().subscribe({
      next: (data) => {
        this.testimonials = data; // Updated in real time
      },
      error: (err) => {
        console.error('Error loading testimonials:', err);
      }
    });
  }
}
