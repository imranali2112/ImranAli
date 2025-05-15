import { Component, Input } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  imports: [SideBarComponent, NavBarComponent, NgxSpinnerModule, RouterOutlet, CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  MenuOpen = true;
  isMenuOpen = false;

  toggleMenu() {
    this.MenuOpen = !this.MenuOpen;
    console.log(this.MenuOpen);

  }

  get dynamicWidth() {
    return this.MenuOpen ? 'calc(100% - 18rem)' : 'calc(100% - 5rem)';
  }

  get dynamicMargin() {
    return this.MenuOpen ? 'ms-72' : 'ms-20';
  }

}