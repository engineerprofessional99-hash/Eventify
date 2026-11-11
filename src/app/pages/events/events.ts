import { Component, computed, signal } from '@angular/core';

interface EventItem{
  id: number;
  price: number;
  name: string;
  category: string;
  location: string;
  date: string;
  description: string;
}

@Component({
  imports: [],
  standalone: true,
  selector: 'app-events',
  styleUrl: './events.css',
  templateUrl: './events.html',
})
export class Events {
  searchTerm = signal("");
  selectedCategory = signal("All")
  events = signal<EventItem[]>([
    {
      id: 1,
      name: 'AI Innovation Summit',
      category: 'Technology',
      location: 'Lahore',
      date: '2026-12-15',
      price: 2500,
      description: 'Explore the latest AI innovations.'
    },
    {
      id: 2,
      name: 'Live Music Festival',
      category: 'Music',
      location: 'Karachi',
      date: '2026-12-20',
      price: 3000,
      description: 'Enjoy live performances.'
    },
    {
      id: 3,
      name: 'Business Leadership Meetup',
      category: 'Business',
      location: 'Islamabad',
      date: '2026-12-25',
      price: 1800,
      description: 'Connect with business professionals.'
    },
    {
      id: 4,
      name: 'National Sports Challenge',
      category: 'Sports',
      location: 'Multan',
      date: '2026-12-28',
      price: 1500,
      description: 'Experience exciting sports competitions.'
    }
  ]);
filteredEvents = computed(() => {
  return this.events().filter(event => {
    const matchesSearch = event.name.toLowerCase()
    .includes(this.searchTerm().toLowerCase());

    const matchesCategory = this.selectedCategory() === 'All' ||
    event.category === this.selectedCategory();
    return matchesSearch && matchesCategory;
  });
});
}
