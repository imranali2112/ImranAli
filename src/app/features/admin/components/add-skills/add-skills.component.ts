import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-skills',
  imports: [MatFormFieldModule,MatIconModule,MatInputModule , MatDividerModule, MatButtonModule ],
  templateUrl: './add-skills.component.html',
  styleUrl: './add-skills.component.css'
})
export class AddSkillsComponent {

}
