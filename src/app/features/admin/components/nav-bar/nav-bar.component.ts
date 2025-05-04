import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isMenuOpen = false; 
  @Input() MenuOpen!: boolean;
  
  profileOpation = [
    { label: 'Account', icon: 'person', route: '/account' },
    { label: 'Inbox', icon: 'inbox', route: '/inbox' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
    { label: 'Logout', icon: 'logout', route: '/logout' }

  ];
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  
  get dynamicWidth() {
    return this.MenuOpen ? 'calc(100% - 18rem)' : 'calc(100% - 5rem)';
  }

  get dynamicMargin() {
    return this.MenuOpen ? 'ms-72' : 'ms-20';
  }

  
}
