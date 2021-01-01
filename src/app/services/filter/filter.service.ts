import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { FilterOption } from 'src/app/interfaces/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  name: BehaviorSubject<string>;
  region: BehaviorSubject<string>;
  sex: BehaviorSubject<string>;
  filterOptions: BehaviorSubject<FilterOption>;
  
  constructor() { 
    this.name = new BehaviorSubject("");
    this.region = new BehaviorSubject("");
    this.sex = new BehaviorSubject("");
    this.filterOptions = new BehaviorSubject({name:"", region:"", sex:""});
    
    this.name.subscribe(() => this.filterOptions.next({
      name: this.name.value,
      region: this.region.value,
      sex: this.sex.value,
    }));
    this.region.subscribe(() => this.filterOptions.next({
      name: this.name.value,
      region: this.region.value,
      sex: this.sex.value,
    }));
    this.sex.subscribe(() => this.filterOptions.next({
      name: this.name.value,
      region: this.region.value,
      sex: this.sex.value,
    }));
  }
}
