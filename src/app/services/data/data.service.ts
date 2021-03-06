import { Injectable } from '@angular/core';
import { Language } from 'src/app/enums/language';
import { BehaviorSubject } from 'rxjs';
import { HistoryJSON } from 'src/app/interfaces/json/historyJSON';
import { TeamJSON } from 'src/app/interfaces/json/teamJSON';
import { PictureJSON } from 'src/app/interfaces/json/pictureJSON';
import * as _pictures from 'src/assets/data/pictures.json';
import * as _history from 'src/assets/data/history.json';
import * as _members from '../../../assets/data/members.json';

@Injectable()
export class DataService {

  language = new BehaviorSubject(Language.FR);
  currentSections: string[];
  static pictures_: any = (_pictures as any).default;
  static history_ = (_history as any).default as HistoryJSON[];
  static teams_: any[] = (_members as any).default;

  constructor() {
  }

  getHistory(): HistoryJSON {
    return DataService.history_[this.language.value];
  }

  getMembers(): TeamJSON[] {
    return DataService.teams_[this.language.value] as TeamJSON[];
  }

  getPictures(): PictureJSON[] {
    return DataService.pictures_ as PictureJSON[];
  }

  getSent(): string {
    return (this.language.value === Language.EN) ? "Your message has been sent!" : "Votre message a été envoyé!";
  }

  errorMessage(): string {
    return (this.language.value === Language.EN) ? "Sorry, we encountered some problems, try again later :(" :
      "Désolé, nous avons rencontré des problèmes, réessayez plus tard :(";
  }
}
