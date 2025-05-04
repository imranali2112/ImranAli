import { Component, NgZone } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { AdminInterface, serviceData } from '../../../../shared/interface/admin-interface';
import { AddServiceService } from '../../services/add-service/add-service.service';


@Component({
  selector: 'app-add-services',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatDividerModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-services.component.html',
  styleUrl: './add-services.component.css'
})
export class AddServicesComponent {
  serviceForm!: FormGroup;

  constructor(private fb: FormBuilder, private theService: AddServiceService, private ngZone: NgZone ){}

  ngOnInit() {
    this.serviceForm = this.fb.group({
      title: ['', Validators.required], 
      description: ['', Validators.required], 
    });
  } 

  onSubmit() {
    console.log(this.serviceForm);
    
    if (this.serviceForm.valid) {
      const serviceData: AdminInterface = this.serviceForm.value;  
      this.theService.addService(serviceData)  
        .then((res: any) => {
          console.log('Profile added successfully:', res);
          this.serviceForm.reset();
        })
        .catch((err: any) => {
          console.error('Error adding profile:', err);
        });
    } else {
      console.log('Form is invalid or file not selected');
    }
  }
}
