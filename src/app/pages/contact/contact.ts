import { Component, inject, signal } from '@angular/core';
import { Validators, FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
// import { validate } from '@angular/forms/signals';
import { ContactServices } from '../../services/contact/contact-services';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
  contactForm: FormGroup;
  successMessage = signal('');
  // clearSuccessMessage = signal('');
  loading = signal(false);


  private router = inject(Router);
  constructor(private fb: FormBuilder,
              private contactService: ContactServices,
  ) 
  {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: ['', Validators.required],
      subject: ['',Validators.required],
      message: ['', Validators.required]
    });
  }
  submitForm(){
    const formData = this.contactForm.getRawValue();
    const newMessage = {
      id: Date.now(),
      name: formData.name ?? '',
      email: formData.email ?? '',
      phone: formData.phone ?? '',
      subject: formData.subject ?? '',
      message: formData.message ?? '',
      status: 'open' as const,
      submittedAt: new Date().toISOString()
    };
    this.contactService.addMessage(newMessage);
    this.loading.set(true);
    if(this.contactForm.invalid){
      this.contactForm.markAllAsTouched()
      return;
    }
    this.successMessage.set("Form Submitted.");
    this.contactForm.reset();
    this.loading.set(false);
    this.router.navigate(['/contact-message']);
  }
  clearSuccessMessage(){
    this.successMessage.set('');
  }

}
