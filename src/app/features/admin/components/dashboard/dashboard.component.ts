import { Component } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { AddAboutComponent } from "../add-about/add-about.component";
import { ProfileComponent } from "../profile/profile.component";
import { AddProjectsComponent } from "../add-projects/add-projects.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { BodyComponent } from "../body/body.component";

@Component({
  selector: 'app-dashboard',
  imports: [SideBarComponent, NavBarComponent, BodyComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  MenuOpen = true;

  toggleMenu() {
    this.MenuOpen = !this.MenuOpen;
  }
}
