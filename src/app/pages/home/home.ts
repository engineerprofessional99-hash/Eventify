import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
// type Category = 'All Events' | 'Music' | 'Technology' | 'Business' | 'Sports' | 'Education';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  searchText = signal('');
  searchError = signal('');
  selectedCategory = signal('All Events');

  categories = [
    'All Events',
    'Music',
    'Technology',
    'Business',
    'Sports',
    'Education'
  ];
  featuredEvents = [
    {
      id: 1,
      name: 'AI Innovation Summit',
      location: 'Lahore',
      date: '2026-12-15',
      price: 2500,
      category: 'Technology'
    },
    {
      id: 2,
      name: 'Live Music Festival',
      location: 'Karachi',
      date: '2026-12-20',
      price: 3000,
      category: 'Music'
    },
    {
      id: 3,
      name: 'Business Leadership Meetup',
      location: 'Islamabad',
      date: '2026-12-25',
      price: 1800,
      category: 'Business'
    }
  ];
constructor(private router: Router) {}
  selectCategory(category: string) {
    this.selectedCategory.set(category);
      if (category === 'All Events') {
        this.router.navigate(['/events']);
        return;
      } const event = this.featuredEvents.find(items => items.category === category);
      if(event){
        this.router.navigate(['/events',event.id]);
      }else{
        this.router.navigate(['/events'],{
          queryParams: {category: category}
        })
      }

  }
  searchEvents() {
    const search = this.searchText().trim();
    if (!search) {
      this.searchError.set('Please enter an event name.');
      return;
    }
    this.searchError.set('');
    this.router.navigate(['/events'], {
      queryParams: {
        search: search,
        category: this.selectedCategory()
      }
    });
  }
  browseEvents() {
    this.router.navigate(['/events'], {
      queryParams: {
        category: this.selectedCategory()
      }
    });
  }
  viewDetails(id: number) {
    this.router.navigate(['/events', id]);
  };
}
  
