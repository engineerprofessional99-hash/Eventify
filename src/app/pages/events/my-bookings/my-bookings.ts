import { Component, inject } from '@angular/core';
import { BookingService } from '../../../services/booking/booking-service';

@Component({
  imports: [],
  selector: 'app-my-bookings',
  standalone: true,
  styleUrl: './my-bookings.css',
  templateUrl: './my-bookings.html',
})
export class MyBookings {
  bookingService = inject(BookingService);
  booking = this.bookingService.bookingRecords;
    cancelBooking(id: number){
    this.bookingService.removeBooking(id);
  }
}
