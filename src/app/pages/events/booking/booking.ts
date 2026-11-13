import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { EventService } from '../../../services/pages-services/event-service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookingService } from '../../../services/booking/booking-service';
import { BookingItem } from '../../../services/booking/booking-service';
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-booking',
  styleUrl: './booking.css',
  templateUrl: './booking.html',
})
export class Booking {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);
  private bookingService = inject(BookingService);
  
  fullName = signal('');
  emailAddress = signal('');
  phoneNumber = signal('');
  noOfTickets = signal(1);
  specialRequests = signal('');
  bookingSuccess = signal(false);

  eventId = Number(this.route.snapshot.paramMap.get('id'));
  selectedEvent = computed(()=>
  this.eventService.events().find(events=> events.id === this.eventId))

  bookingForm = new FormGroup({
    fullName: new FormControl('',
       [Validators.required, Validators.minLength(3)]),
    emailAddress: new FormControl('',
      [Validators.required, Validators.email]),
    phoneNumber: new FormControl('',
      [Validators.required, Validators.minLength(10),Validators.maxLength(15), Validators.pattern(/^\+?[0-9\s-]{10,15}$/)]),
    noOfTickets: new FormControl('',
      [Validators.required, Validators.min(1), Validators.max(5)]),
    specialRequests: new FormControl('',
      [])
  })
  bookingDetails = computed(()=>
  this.bookingForm.getRawValue());
  
  formValues = toSignal(
    this.bookingForm.valueChanges,
      {initialValue: this.bookingForm.getRawValue()}
  )
  totalAmount = computed(()=>{
    const price = this.selectedEvent()?.price ?? 0;
    const ticketQuantity = Number(this.formValues().noOfTickets) || 0;
    return price * ticketQuantity;
  })
  resetForm(){
    this.bookingForm.reset(
      {
        fullName:'',
        phoneNumber: '',
        specialRequests: '',
        noOfTickets: '',
        emailAddress: ''
      }
    )
  }
  submitBookings(){
    if (this.bookingForm.invalid){
      this.bookingForm.markAllAsTouched;
      return;
    }
    const event = this.selectedEvent();
    if(!event){
      return;
    }
    const values = this.formValues();
    const newBooking: BookingItem = {
    id: Date.now(),
    eventId: event.id,
    eventName: event.name,
    customerName: values.fullName ?? '',
    emailAddress: values.emailAddress ?? '',
    phoneNumber: values.phoneNumber ?? '',
    noOfTickets: Number(values.noOfTickets),
    specialRequests: values.specialRequests ?? '',
    pricePerTicket: event.price,
    totalAmount: this.totalAmount(),
    bookingDate: new Date().toISOString(),
    eventImage: event.image
  };
  this.bookingService.addBooking(newBooking);
  this.bookingSuccess.set(true);
  this.resetForm();
  }
  myBooking(){
    this.router.navigate(['/my-bookings']);
  }
  cancelBooking(id: number){
    this.bookingService.removeBooking(id);
  }
}