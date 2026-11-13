import { Inject, Injectable, signal } from '@angular/core';
import { find } from 'rxjs';
export interface BookingItem{
    id: number;
    eventId: number;
    eventName: string;
    customerName: string;
    emailAddress: string;
    phoneNumber: any;
    noOfTickets: any;
    specialRequests: string;
    pricePerTicket: number;
    totalAmount: any;
    bookingDate: string;
    eventImage: string;
}
@Injectable({
    providedIn: 'root'
})
export class BookingService {
    bookingRecords = signal<BookingItem[]>([]);
    constructor(){
        this.loadBookings();
    }
    loadBookings(){
        const savedBookings = localStorage.getItem('eventify-bookings');
        const bookings : BookingItem[] = savedBookings? JSON.parse(savedBookings): [];
        this.bookingRecords.set(bookings);
    };
    savedBookings(){
        const bookings = this.bookingRecords();
        localStorage.setItem('eventify-bookings', JSON.stringify(bookings));
    }
    addBooking(booking: BookingItem){
        this.bookingRecords.update(currentBooking => 
            [...currentBooking, booking])
            this.savedBookings();
        }
removeBooking(id: number) {
  this.bookingRecords.update(currentBookings =>
    currentBookings.filter(booking => booking.id !== id)
  );

  this.savedBookings();
}
}
