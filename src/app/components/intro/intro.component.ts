import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { HotkeysService } from 'src/app/services/hotkeys/hotkeys.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnDestroy {

  static TIME_IN_SECONDS: number = 1.5;
  static NUMBER_OF_IMAGES: number = 8;
  private counter: number = 0;
  private subscriptions: Subscription[] = [];
  private timer: NodeJS.Timer;
  private timerIsOn: boolean;

  constructor(private shortcuts: HotkeysService) {
    this.timer = this.setTimer();
    this.timerIsOn = true;
  }

  ngOnInit() {
    this.subscriptions.push(this.shortcuts.addShortcut({ keys: "space", description: "Pause/Play" }).subscribe( () => this.pause()));

    this.subscriptions.push(this.shortcuts.addShortcut({ keys: "arrowleft", description: "Next Picture" }).subscribe((_event) => {
      this.timerIsOn = true;
      this.pause();
      this.changeImage(this.getPrevious());
    }));

    this.subscriptions.push(this.shortcuts.addShortcut({ keys: "arrowright", description: "Previous Picture" }).subscribe((_event) => {
      this.timerIsOn = true;
      this.pause();
      this.changeImage(this.getNext());
    }));
  }

  ngOnDestroy(): void {
    for (let i: number = this.subscriptions.length - 1; i >= 0; --i) {
      this.subscriptions[i].unsubscribe();
      this.subscriptions.pop();
    }
  }
  
  private setTimer(): NodeJS.Timer{
    return setInterval(() => { this.changeImage(this.getNext()) }, IntroComponent.TIME_IN_SECONDS * 1000);
  }

  private pause(): void {
    if(this.timerIsOn) {
      this.timerIsOn = false;
      clearInterval(this.timer);
    } else {
      this.timerIsOn = true;
      this.timer = this.setTimer();
    }
  }

  private changeImage(index: number): void {
    document.getElementById("home-image").style.backgroundImage =
      `url(../../../assets/img/homepage/${index}.JPG)`
  }

  private getNext(): number {
    if (++this.counter >= IntroComponent.NUMBER_OF_IMAGES) {
      this.counter = 0;
    }
    return this.counter;
  }

  private getPrevious(): number {
    if (--this.counter <= 0) {
      this.counter = IntroComponent.NUMBER_OF_IMAGES - 1;
    }
    return this.counter;
  }
}
