import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Events } from './pages/events/events';
import { EventDetails } from './pages/event-details/event-details';
import { Booking } from './pages/events/booking/booking';
import { MyBookings } from './pages/events/my-bookings/my-bookings';
import { Login } from './auth/login/login';
import { authGuard } from './auth/auth-guard/auth-guard';
import { guestGuard } from './auth/guest-guard/guest-guard-guard';

export const routes: Routes = [
    { 
        path: 'login', component: Login , canActivate: [guestGuard]
    },
    { 
        path: 'home', component: Home, canActivate: [authGuard]
    },
    { 
        path: 'about', component: About, canActivate: [authGuard] 
    },
    { 
        path: 'contact', component: Contact, canActivate: [authGuard] 
    },
    { 
        path: 'events', component: Events, canActivate: [authGuard] 
    },
    { 
        path: 'events/:id', component: EventDetails, canActivate: [authGuard] 
    },
    { 
        path: 'events/:id/booking', component: Booking, canActivate: [authGuard] 
    },
    { 
        path: 'my-bookings', component: MyBookings, canActivate: [authGuard] 
    },
    { 
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    { 
        path: '**', redirectTo: 'login', 
    }
];
