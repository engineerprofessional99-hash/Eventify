import { Component, inject, signal } from '@angular/core';
import { ContactServices } from '../../../services/contact/contact-services';
import { DatePipe } from '@angular/common';
import { contactService } from '../../../services/contact/contact-services';
@Component({
  imports: [DatePipe],
  standalone:true,
  selector: 'app-contact-message',
  styleUrl: './contact-message.css',
  templateUrl: './contact-message.html',
})
export class ContactMessage {
  contactService = inject(ContactServices);
  selectedMessage = signal<contactService | null>(null);

  reopenMessage(id: number) {
    this.contactService.message.update((current) => current.map((message) =>message.id === id ?
     { ...message, status: 'open' } : message
      )
    );
    localStorage.setItem(
      'eventify-contactService',
      JSON.stringify(this.contactService.message())
    )
  }
  completeDelete(id: number){
    if(confirm("Are ypu sure you want to delete?")){
      this.contactService.deleteMessage(id)
    }
  }

}
