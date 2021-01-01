import { Component } from '@angular/core';
import * as _socials from 'src/assets/data/social.json';
import { Social } from 'src/app/interfaces/social';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  socials = (_socials as any).default as Social[];
  constructor() { }
}
