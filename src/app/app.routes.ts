import { Routes } from '@angular/router';
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
import { AuthGuard } from './auth/auth.guard';
import { GetContactComponent } from './features/admin/components/get-contact/get-contact.component';
import { ProjectDetailComponent } from './features/user/components/project-detail/project-detail/project-detail.component';


export const routes: Routes = [

  // user said routing 
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'project-detail/:id', component: ProjectDetailComponent },

  // Admin said routing
  { path: 'admin/login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    component: BodyComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'adminHome', component: DashboardComponent },
      { path: 'about', component: AddAboutComponent },
      { path: 'addproject', component: AddProjectsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'skills', component: AddSkillsComponent },
      { path: 'experience', component: AddExperienceComponent },
      { path: 'services', component: AddServicesComponent },
      { path: 'testimonial', component: AddTestimonialComponent },
      { path: 'contact', component: GetContactComponent },
    ],
  },
  { path: '**', redirectTo: 'admin/login' }, // Wildcard route to redirect to login if the route doesn't match

];



