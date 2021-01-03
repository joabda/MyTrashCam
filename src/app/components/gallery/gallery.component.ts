import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { FilterOption } from 'src/app/interfaces/filter';
import { PictureJSON } from 'src/app/interfaces/json/pictureJSON';
import { DataService } from 'src/app/services/data/data.service';
import { EventService } from 'src/app/services/event/event.service';
import { FilterService } from 'src/app/services/filter/filter.service';
import { HotkeysService } from 'src/app/services/hotkeys/hotkeys.service';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy{

  @ViewChild(FilterBarComponent) filterBar: FilterBarComponent;

  pictures: PictureJSON[];
  filteredPictures: PictureJSON[];
  private subscriptions: Subscription[] = [];

  constructor(public data: DataService, private filter: FilterService, 
    private shortcuts: HotkeysService, private events: EventService) {
    data.language.subscribe(() => this.pictures = this.shuffle(data.getPictures()));
    this.filteredPictures = new Array<PictureJSON>();
    this.filter.filterOptions.subscribe(() => {

      this.filteredPictures = [];
      this.pictures.forEach(val => this.filteredPictures.push(Object.assign({}, val)));
      this.filtering(filter.filterOptions.value);
    });

    this.events.shuffleGallery.subscribe( () => {
      this.pictures = this.shuffle(data.getPictures());
      events.shuffleGallery.next(false);
    });
  }

  ngOnInit() {
    this.subscriptions.push(this.shortcuts.addShortcut({ keys: "control.f", description: "Search by name" }).subscribe( () => {
      this.filterBar.searchByName.nativeElement.focus();
    }));

    this.subscriptions.push(this.shortcuts.addShortcut({ keys: "tab", description: "Next Search Field" }).subscribe((_event) => {
      if(document.activeElement === this.filterBar.searchByName.nativeElement) {
        this.filterBar.searchByRegion.nativeElement.focus();
      } else {
        this.filterBar.searchByName.nativeElement.focus();
      }
    }));
  }

  private shuffle(array: Array<any>): Array<any> {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  ngOnDestroy(): void {
    for (let i: number = this.subscriptions.length - 1; i >= 0; --i) {
      this.subscriptions[i].unsubscribe();
      this.subscriptions.pop();
    }
  }

  private filtering(opts: FilterOption): void {
    for (let i: number = 0; i < this.pictures.length; ++i) {
      if (this.pictures[i].model.toLowerCase().indexOf(opts.name) === -1 ||
        this.pictures[i].location.toLowerCase().indexOf(opts.region) === -1
      ) {
        this.filteredPictures[i] = undefined;
      }
      //   if (opts.region !== "Gender" && opts.region !== "Sexe") {
      //     if (this.filteredPictures[i].modelSex !== opts.sex){ 
      //       this.removeElementAtIndex(i)
      //   }
      // }
    }
    this.filteredPictures = this.filteredPictures.filter(el => {
      return el != null;
    });
  }
}
