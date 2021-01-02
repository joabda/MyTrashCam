import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { FilterOption } from 'src/app/interfaces/filter';
import { PictureJSON } from 'src/app/interfaces/json/pictureJSON';
import { DataService } from 'src/app/services/data/data.service';
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
    private shortcuts: HotkeysService) {
    data.language.subscribe(() => this.pictures = data.getPictures());
    this.filteredPictures = new Array<PictureJSON>();
    filter.filterOptions.subscribe(() => {

      this.filteredPictures = [];
      this.pictures.forEach(val => this.filteredPictures.push(Object.assign({}, val)));
      this.filtering(filter.filterOptions.value);
    })
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
