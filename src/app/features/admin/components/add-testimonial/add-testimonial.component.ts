import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-testimonial',
  imports: [MatFormFieldModule,MatIconModule, MatButtonModule, MatDividerModule, MatInputModule],
  templateUrl: './add-testimonial.component.html',
  styleUrl: './add-testimonial.component.css'
})
export class AddTestimonialComponent {

}
