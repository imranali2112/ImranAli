import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet]
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