import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { AboutJSON } from 'src/app/interfaces/json/aboutJSON';
import { FeatureItem } from 'src/app/interfaces/feature-item';
import { TeamJSON } from 'src/app/interfaces/json/teamJSON';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  text: AboutJSON;
  col1: FeatureItem[];
  col2: FeatureItem[];
  teams: TeamJSON[];
  teamTitle: string[];

  constructor(private data: DataService) { 
    this.data.language.subscribe( () => {
      this.text = data.getAbout();
      this.teams = data.getMembers();
      this.teamTitle = data.getTitles().splice(2,1);
      const center = this.text.features.length / 2;
      this.col1 = this.text.features.slice(0, center);
      this.col2 = this.text.features.slice(center);
    });
  }

}
