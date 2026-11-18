import { Injectable,signal } from '@angular/core';
export interface contactService{
    id: number;
    name: string;
    phone: any;
    email: string;
    subject: string;
    message: string;
    submittedAt: string;
    status: 'open' | 'completed';
}
@Injectable({
    providedIn: 'root'
})
export class ContactServices {
    private storageKey = 'eventify-ContactService';
    message = signal<contactService[]>([]);
    constructor(){
        this.loadMessage();
    }
    loadMessage(){
        const savedMessage = localStorage.getItem(this.storageKey);
        if(savedMessage){
            this.message.set(JSON.parse(savedMessage));
        }
    }
    addMessage(newMessage: contactService){
        this.message.update(current => [...current, newMessage]);
        localStorage.setItem(this.storageKey,
            JSON.stringify(this.saveMessages())
        )
    }
    completedMessage(id: number){
        this.message.update(current =>
            current.map(message =>
                message.id === id ? { ...message, status: 'completed' as const} : message
            )
        );
        // localStorage.setItem(this.storageKey, JSON.stringify(this.message()));
          this.saveMessages();
    }
    deleteMessage(id: number){
        this.message.update(current => current.filter(message => message.id !== id)
        );
        this.saveMessages();
    }
    private saveMessages(){
        localStorage.setItem(
            this.storageKey,
            JSON.stringify(this.message())
        )
    }
}
