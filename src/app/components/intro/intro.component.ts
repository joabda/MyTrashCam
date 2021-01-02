import { Component } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {

  static TIME_IN_SECONDS: number = 1;
  static NUMBER_OF_IMAGES: number = 5;
  private counter: number = 0;

  constructor() { 
    setInterval(()=> { this.changeImage() }, IntroComponent.TIME_IN_SECONDS * 1000);
  }

  private changeImage(): void {
    document.getElementById("home-image").style.backgroundImage = 
      `url(../../../assets/img/homepage/${this.getNext()}.jpg)`
  }

  private getNext(): number {
    if(++this.counter >= IntroComponent.NUMBER_OF_IMAGES) {
      this.counter = 0;
    }
    return this.counter;
  }
}
