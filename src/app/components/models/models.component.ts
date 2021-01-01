import { Component, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Subscription } from 'rxjs';
import { HotkeysService } from 'src/app/services/hotkeys/hotkeys.service';
import { TeamJSON } from 'src/app/interfaces/json/teamJSON';
import { Language } from 'src/app/enums/language';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnDestroy {

  private subscriptions: Subscription[] = [];
  teams: TeamJSON[];

  constructor(
    public data: DataService,
    private shortcut: HotkeysService) {
      data.language.subscribe( () => this.teams = data.getMembers() );
      this.teams.forEach( el => {
        el.members.forEach( el1 => console.log(el1.instagram))
      })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscribed => {
        subscribed.unsubscribe();
        this.subscriptions.pop();
    });
  }

  getTitle(): string {
    return this.data.language.value === Language.FR ? "Notre incroyable équipe" : "Our amazing team"
  }
}
