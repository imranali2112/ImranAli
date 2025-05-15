import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos'

import { NgxSpinnerModule } from 'ngx-spinner';
 import { ChartConfiguration, ChartType } from 'chart.js';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NgxSpinnerModule]
})
export class AppComponent  {
  title = 'My-Portfolio'; 
  ngOnInit() {
    AOS.init({
      duration: 1000,  // Animation duration
      easing: 'ease-in-out',  // Animation easing
      delay: 200,  // Run the animation once when it comes into view
    });

    
  }

  

}