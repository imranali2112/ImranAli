import { Component } from '@angular/core';
import { ContactService } from '../../services/contact-service/contact.service';
import { contactData } from '../../../../shared/interface/admin-interface';

@Component({
  selector: 'app-get-contact',
  imports: [],
  templateUrl: './get-contact.component.html',
  styleUrl: './get-contact.component.css'
})
export class GetContactComponent {
contacts: contactData[] = [];

  constructor(private contactService: ContactService) {}
  
  async ngOnInit() {
    await this.contactService.getMessages();
    this.contacts = this.contactService.contacts();
  }
}
