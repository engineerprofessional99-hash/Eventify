import { HttpClient } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';

export interface AuthResponse{
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    accessToken: string;
    refreshToken: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private https = inject(HttpClient);
    isLoggedIn = signal(false);
    currentUser = signal<AuthResponse | null>(null);
    private adminUsername = 'admin';
    // isLoading = signal(true);

    isAdmin(){
        this.currentUser()?.username === this.adminUsername;
    }

    logIn(){
        this.isLoggedIn.set(true);
    }
    logOut(){
        this.isLoggedIn.set(false);
        this.currentUser.set(null);
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    }
    loginWithApi(username: string, password: string) {
        return this.https.post<AuthResponse>('https://dummyjson.com/auth/login',
            {
                username: username,
                password: password
            }
        );
    }
    setCurrentUser(user: AuthResponse){
        this.currentUser.set(user);
    }
    saveSession(user: AuthResponse){
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('accessToken', user.accessToken);
        sessionStorage.setItem('refreshToken', user.refreshToken);
    }
    loadSession(){
        const savedUser = sessionStorage.getItem('currentUser')
        if(savedUser){
            const user: AuthResponse = JSON.parse(savedUser);
            this.currentUser.set(user);
            this.isLoggedIn.set(true);
        }
    }
}
