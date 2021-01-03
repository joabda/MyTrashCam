import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  shuffleGallery: BehaviorSubject<boolean>;

  constructor() { 
    this.shuffleGallery = new BehaviorSubject(false);
  }
}
