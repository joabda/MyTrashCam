import { Component } from '@angular/core';
import { PictureJSON } from 'src/app/interfaces/json/pictureJSON';
import { DataService } from 'src/app/services/data/data.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  pictures: PictureJSON[];

  constructor(public data: DataService) {
    data.language.subscribe( () => this.pictures = data.getPictures());
  }
}
