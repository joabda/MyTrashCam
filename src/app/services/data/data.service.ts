import { Injectable } from '@angular/core';
import { Title } from 'src/app/interfaces/titles';
import { Language } from 'src/app/enums/language';
import { BehaviorSubject } from 'rxjs';
import { ContactUsJSON } from 'src/app/interfaces/json/ContactUsJSON';
import { AboutJSON } from 'src/app/interfaces/json/aboutJSON';
import { HistoryJSON } from 'src/app/interfaces/json/historyJSON';
import * as _titles from 'src/assets/data/titles.json';
import * as _pictures from 'src/assets/data/pictures.json';
import * as _contactUs from 'src/assets/data/contact-us.json';
import * as _about from 'src/assets/data/about.json';
import * as _history from 'src/assets/data/history.json';
import * as _members from '../../../assets/data/members.json';
import * as _filterBar from '../../../assets/data/filterBar.json';
import { TeamJSON } from 'src/app/interfaces/json/teamJSON';
import { PictureJSON } from 'src/app/interfaces/json/pictureJSON';
import { FilterBarJSON } from 'src/app/interfaces/json/filterBarJSON';

@Injectable()
export class DataService {

  language = new BehaviorSubject(Language.FR);
  currentSections: string[];
  static titles_ = (_titles as any).default as Title[];
  static contactUs_ = (_contactUs as any).default as ContactUsJSON[];
  static about_ = (_about as any).default as AboutJSON[];
  static filterBar_: any[] = (_filterBar as any).default as FilterBarJSON[];
  static pictures_: any = (_pictures as any).default;
  static history_ = (_history as any).default as HistoryJSON[];
  static teams_: any[] = (_members as any).default;

  constructor() {
  }

  getTitles(): string[] {
    if (this.language.value === Language.FR) {
      this.currentSections = DataService.titles_.map(function (title) {
        return title.fr;
      });
    } else {
      this.currentSections = DataService.titles_.map(function (title) {
        return title.en;
      });
    }
    return this.currentSections;
  }

  getHistory(): HistoryJSON {
    return DataService.history_[this.language.value];
  }

  getMembers(): TeamJSON[] {
    return DataService.teams_[this.language.value] as TeamJSON[];
  }

  getFilterBarText(): FilterBarJSON {
    return DataService.filterBar_[this.language.value];
  }

  getPictures(): PictureJSON[] {
    return DataService.pictures_ as PictureJSON[];
  }

  getContactUs(): ContactUsJSON {
    return DataService.contactUs_[this.language.value];
  }

  getAbout(): AboutJSON {
    return DataService.about_[this.language.value];
  }

  getSent(): string {
    if(this.language.value === Language.EN) {
      return "Your message has been sent!";
    } else {
      return "Votre message a été envoyé!";
    }
  }

  errorMessage(): string {
    if(this.language.value === Language.EN) {
      return "Sorry, we encountered some problems, try again later :(";
    } else {
      return "Désolé, nous avons rencontré des problèmes, réessayez plus tard :(";
    }
  }

}
