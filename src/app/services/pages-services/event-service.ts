import { Injectable, signal } from '@angular/core';
interface EventItem{
  id: number;
  price: number;
  name: string;
  category: string;
  location: string;
  date: string;
  description: string;
  image: string;
}
@Injectable({
    providedIn: 'root'
})
export class EventService {
     events = signal<EventItem[]>([
    {
        id: 1,
        name: 'AI Innovation Summit',
        category: 'Technology',
        location: 'Lahore',
        date: '2026-12-15',
        price: 2500,
        description: 'Explore the latest AI innovations.',
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400",
    },
    {
      id: 2,
      name: 'Live Music Festival',
      category: 'Music',
      location: 'Karachi',
      date: '2026-12-20',
      price: 3000,
      description: 'Enjoy live performances.',
      image:'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1400'
    },
    {
      id: 3,
      name: 'Business Leadership Meetup',
      category: 'Business',
      location: 'Islamabad',
      date: '2026-12-25',
      price: 1800,
      description: 'Connect with business professionals.',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400'
    },
    {
      id: 4,
      name: 'National Sports Challenge',
      category: 'Sports',
      location: 'Multan',
      date: '2026-12-28',
      price: 1500,
      description: 'Experience exciting sports competitions.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1400'
    }
  ]);
}
