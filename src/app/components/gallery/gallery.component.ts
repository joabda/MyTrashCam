import { Component, OnInit } from '@angular/core';
import { FilterOption } from 'src/app/interfaces/filter';
import { PictureJSON } from 'src/app/interfaces/json/pictureJSON';
import { DataService } from 'src/app/services/data/data.service';
import { FilterService } from 'src/app/services/filter/filter.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  pictures: PictureJSON[];
  filteredPictures: PictureJSON[];

  constructor(public data: DataService, private filter: FilterService) {
    data.language.subscribe(() => this.pictures = data.getPictures());
    this.filteredPictures = new Array<PictureJSON>();
    filter.filterOptions.subscribe(() => {

      this.filteredPictures = [];
      this.pictures.forEach(val => this.filteredPictures.push(Object.assign({}, val)));
      this.filtering(filter.filterOptions.value);
    })
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
