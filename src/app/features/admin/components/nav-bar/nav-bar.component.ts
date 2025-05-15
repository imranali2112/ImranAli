import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isMenuOpen = false;
  @Input() MenuOpenn!: boolean;
  @Input() MenuOpen!: boolean;
  @Output() toggleMenu = new EventEmitter<void>();

  menuToggle() {
    this.toggleMenu.emit();
  }

  constructor(private authService: AuthService, private router: Router) { }

  profileOpation = [
    { label: 'Account', icon: 'person', route: '/account' },
    { label: 'Inbox', icon: 'inbox', route: 'contact' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
    { label: 'Logout', icon: 'logout', route: '/logout' }

  ];
  toggleMenuu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenuu() {
    this.isMenuOpen = false;
  }

  get dynamicWidth() {
    return this.MenuOpen ? 'calc(100% - 18rem)' : 'calc(100% - 5rem)';
  }

  get dynamicMargin() {
    return this.MenuOpen ? 'ms-72' : 'ms-20';
  }

  onLogout(item: any): void {
    if (item.label === 'Logout') {
      this.authService.logout().subscribe(() => {
        this.authService.currentUserSig.set(null);
        this.router.navigateByUrl('/');
      })
    }
  }
}
