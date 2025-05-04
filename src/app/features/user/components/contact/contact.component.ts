import { Component } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-contact',
  imports: [MatFormFieldModule,MatIconModule, MatInputModule, MatDividerModule, MatButtonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {

}
