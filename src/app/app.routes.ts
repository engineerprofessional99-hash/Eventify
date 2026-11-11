import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Login } from './pages/authentication/login/login';
import { Contact } from './pages/contact/contact';
import { Events } from './pages/events/events';

export const routes: Routes = [
    {path:'home',component: Home},
    {path:'about',component: About },
    {path:'login',component: Login},
    {path:'contact',component: Contact },
    { path:'events',component: Events}
];
