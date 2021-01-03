import { Component, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Subscription } from 'rxjs';
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
    public data: DataService) {
      data.language.subscribe( () => this.teams = data.getMembers() );
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
