import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../app.routes';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  @Input() MenuOpen!: boolean;
  @Output() toggleMenu = new EventEmitter<void>();

  menuToggle() {
    this.toggleMenu.emit();
  }


  sideBarOpation = [
    { lable: 'About', icon: 'person', route: 'about' },
    { lable: 'Profile', icon: 'account_circle', route: 'profile' },
    { lable: 'Services', icon: 'design_services', route: 'services' },
    { lable: 'Skills', icon: 'military_tech', route: 'skills' },
    { lable: 'Add Project', icon: 'note_add', route: 'addproject' },
    { lable: 'Experience', icon: 'work_history', route: 'experience' },
    { lable: 'Testimonial', icon: 'rate_review', route: 'testimonial' },
    { lable: 'Login', icon: 'login', route: 'login' },
  ]

}
