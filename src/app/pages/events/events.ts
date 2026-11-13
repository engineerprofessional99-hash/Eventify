import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/pages-services/event-service';

// interface EventItem{
//   id: number;
//   price: number;
//   name: string;
//   category: string;
//   location: string;
//   date: string;
//   description: string;
// }
type sortOption= 'default'|'priceLow'| 'priceHigh' | 'dateEarly' | 'dateLate';
@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-events',
  styleUrl: './events.css',
  templateUrl: './events.html',
})
export class Events {
  searchTerm = signal("");
  selectedCategory = signal("All");
  sortOption = signal<sortOption>('default');
  private eventService = inject(EventService);
  events = this.eventService.events;

filteredEvents = computed(() => {
  return this.events().filter((event) => {
    const matchesSearch = event.name.toLowerCase()
      .includes(this.searchTerm().toLowerCase());

    const matchesCategory = this.selectedCategory() === 'All' ||
      event.category === this.selectedCategory();
    return matchesSearch && matchesCategory;
  });
});
sortedEvents = computed(()=>{
  const result = [...this.filteredEvents()];
  switch(this.sortOption()){
    // case 'default':
    //   break;
    case 'priceLow':
      result.sort((a,b) => a.price - b.price);
      break;
    case 'priceHigh':
      result.sort((a,b) => b.price - a.price);
      break;
    case 'dateEarly':
      result.sort((a, b) => new Date(a.date).getTime()
       - new Date(b.date).getTime());
      break;
    case 'dateLate':
      result.sort((a, b) => new Date(b.date).getTime()
       - new Date(a.date).getTime());
      break;
      case 'default':
      break;
  }
  return result;
});
}
