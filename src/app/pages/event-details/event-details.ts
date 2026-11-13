import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/pages-services/event-service';

@Component({
  imports: [RouterLink],
  selector: 'app-event-details',
  standalone: true,
  styleUrl: './event-details.css',
  templateUrl: './event-details.html',
})
export class EventDetails {
  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);
  eventId = Number(this.route.snapshot.paramMap.get('id'));
  selectedEvents = computed(()=>
  this.eventService.events().find( 
    event => event.id === this.eventId
  ));
}
