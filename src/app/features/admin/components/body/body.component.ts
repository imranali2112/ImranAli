import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  @Input() MenuOpen!: boolean;

  get dynamicWidth() {
    return this.MenuOpen ? 'calc(100% - 18rem)' : 'calc(100% - 5rem)';
  }

  get dynamicMargin() {
    return this.MenuOpen ? 'ms-72' : 'ms-20';
  }
}
