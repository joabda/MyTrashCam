import { Component } from '@angular/core';
import { Social } from 'src/app/interfaces/social';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  socials: Social[];
  constructor() {
    this.socials = [
      {
        "link": "https://www.tiktok.com/@mytrashcam",
        "iconSrc": "../../../assets/img/social/tiktok.png",
        "title": "TikTok"
      },
      {
        "link": "https://www.instagram.com/mytrashcam/",
        "iconSrc": "../../../assets/img/social/instagram.png",
        "title": "Instagram"
      },
      {
        "link": "https://www.youtube.com/channel/UC0yes3ERjE4PFzoaVs_uudQ/featured",
        "iconSrc": "../../../assets/img/social/youtube.png",
        "title": "Youtube"
      }
    ];
  }
}
