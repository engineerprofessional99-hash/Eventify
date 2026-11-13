import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Login } from './pages/authentication/login/login';
import { Contact } from './pages/contact/contact';
import { Events } from './pages/events/events';
import { EventDetails } from './pages/event-details/event-details';
import { Booking } from './pages/events/booking/booking';
import { MyBookings } from './pages/events/my-bookings/my-bookings';

export const routes: Routes = [
    {path:'home',component: Home},
    {path:'about',component: About },
    {path:'login',component: Login},
    {path:'contact',component: Contact },
    { path:'events',component: Events},
    {path: 'events/:id', component: EventDetails},
    {path: 'events/:id/booking', component: Booking},
    {path: 'my-bookings', component: MyBookings}
];
