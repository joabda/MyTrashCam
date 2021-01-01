import { Component } from '@angular/core';
import { ModalDirective, ModalModule } from 'angular-bootstrap-md';
import { PictureJSON } from 'src/app/interfaces/json/pictureJSON';
import { DataService } from 'src/app/services/data/data.service';


@Component({
  selector: 'app-sponsors',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  pictures: PictureJSON[];

  constructor(public data: DataService) {
    data.language.subscribe( () => this.pictures = data.getPictures());
  }

  show(imageNumber: number): void {
    console.log(`picture${imageNumber}`);
    console.log(document.getElementsByTagName(`picture${imageNumber}`)[0]);
    (document.getElementsByTagName(`picture${imageNumber}`)[0] as unknown as ModalDirective).show();
  }

}
