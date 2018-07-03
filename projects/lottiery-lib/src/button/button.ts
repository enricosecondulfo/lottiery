import {
  Component,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Lottie from 'lottie-web';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'lottiery-button',
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class LottieryButton implements AfterViewInit {
  @Input() path: string;
  @Input() firstState: [number, number];
  @Input() lastState: [number, number];
  @Input() speed: number;

  @ViewChild('lottieryContainer') container: ElementRef;

  private animation: any;
  private isReady: BehaviorSubject<boolean>;
  private state = false;

  constructor() {
    this.isReady = new BehaviorSubject<boolean>(false);
  }

  ngAfterViewInit(): void {
    this.create();
  }

  create(): void {
    const options = {
      container: this.container.nativeElement,
      path: this.path || '',
      prerender: true,
      autoplay: false,
      loop: false
    };

    this.animation = Lottie.loadAnimation(options);
    this.animation.addEventListener('DOMLoaded', () => {
      this.isReady.next(true);
    });
  }

  @HostListener('click')
  private onClick(): void {
    this.isReady.pipe(filter(state => state === true)).subscribe(() => {
      this.animation.setDirection(this.state ? -1 : 1);
      this.animation.play();
      /* this.animation.playSegments(
        this.state ? this.lastState : this.firstState,
        true
      ); */

      this.state = !this.state;
    });
  }
}
