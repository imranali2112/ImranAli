import { Routes } from '@angular/router';
import { ExperienceComponent } from './features/user/components/experience/experience.component';
import { ContactComponent } from './features/user/components/contact/contact.component';
import { ProjectsComponent } from './features/user/components/projects/projects.component';
import { ExpertiesComponent } from './features/user/components/experties/experties.component';
import { SkillsComponent } from './features/user/components/skills/skills.component';
import { AboutComponent } from './features/user/components/about/about.component';
import { TestimonialComponent } from './features/user/components/testimonial/testimonial.component';
import { DashboardComponent } from './features/admin/components/dashboard/dashboard.component';
import { HomeComponent } from './features/user/components/home/home.component';
import { AddAboutComponent } from './features/admin/components/add-about/add-about.component';
import { BodyComponent } from './features/admin/components/body/body.component';
import { AddProjectsComponent } from './features/admin/components/add-projects/add-projects.component';
import { ProfileComponent } from './features/admin/components/profile/profile.component';
import { AddSkillsComponent } from './features/admin/components/add-skills/add-skills.component';
import { AddExperienceComponent } from './features/admin/components/add-experience/add-experience.component';
import { AddServicesComponent } from './features/admin/components/add-services/add-services.component';
import { AddTestimonialComponent } from './features/admin/components/add-testimonial/add-testimonial.component';
import { LoginComponent } from './features/admin/components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: AboutComponent },
      { path: 'experience', component: ExperienceComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'project', component: ProjectsComponent },
      { path: 'experties', component: ExpertiesComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'testimonial', component: TestimonialComponent },
    ]
  },
  {
    path: 'admin',
    component: DashboardComponent,
     children: [
      // { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'about', component: AddAboutComponent },
      { path: 'addproject', component: AddProjectsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'skills', component: AddSkillsComponent },
      { path: 'experience', component: AddExperienceComponent },
      { path: 'services', component: AddServicesComponent },
      { path: 'testimonial', component: AddTestimonialComponent },
      { path: 'login', component: LoginComponent },

    ]
  },
];
