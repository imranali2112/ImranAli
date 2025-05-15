import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
 import { Router } from '@angular/router';
 import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatDividerModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
 
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.user$.subscribe(user =>{
      if(user){
        this.authService.currentUserSig.set({
          email: user.email
        })
      } else{
        this.authService.currentUserSig.set(null)
      }
      console.log(user);
    })
  }

   onSubmit(): void {
  if (this.loginForm.invalid) return;

  const rawForm = this.loginForm.getRawValue();
  this.authService
    .login(rawForm.email, rawForm.password)
    .subscribe({
      next: () => {
        this.router.navigateByUrl('admin');
      },
      error: (err) => {
        this.errorMessage = err.code;
      }
    });
}
}
