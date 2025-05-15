import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { ExpertiesComponent } from "../experties/experties.component";
import { ProjectsComponent } from "../projects/projects.component";
import { SkillsComponent } from "../skills/skills.component";
import { ExperienceComponent } from "../experience/experience.component";
import { TestimonialComponent } from "../testimonial/testimonial.component";
import { ContactComponent } from "../contact/contact.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { AboutComponent } from "../about/about.component";  
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProjectDetailComponent } from "../project-detail/project-detail/project-detail.component";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [ HeaderComponent, FooterComponent,ExpertiesComponent, ProjectsComponent, SkillsComponent, ExperienceComponent, TestimonialComponent, ContactComponent, NgxSpinnerModule, AboutComponent, MatProgressSpinnerModule],

})
export class HomeComponent {

}
