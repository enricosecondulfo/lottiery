import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import * as Lottie from 'lottie-web';
import { Subject, pipe, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'lottiery-state-view',
  templateUrl: './state-view.html'
})
export class LottieryStateView implements AfterViewInit, OnChanges, OnDestroy {
  @Input() path: string;
  @Input() prerender: string;
  @Input() speed: number;
  @Input() steps: [number, number][];
  @Input() state: number;

  @ViewChild('lottieryContainer') container: ElementRef;

  private animation: any;
  private isReady: BehaviorSubject<boolean>;

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
      prerender: this.prerender || false,
      autoplay: false,
      loop: false
    };

    this.animation = Lottie.loadAnimation(options);
    this.animation.addEventListener('DOMLoaded', () => {
      this.isReady.next(true);
    });

    /* this.animation.setSpeed(this.speed || 1);

    if (this.state !== undefined) {
      this.playSequence(this.steps[this.state]);
    } */
  }

  playSequence(sequence: [number, number]): void {
    this.isReady.pipe(filter(state => state === true)).subscribe(() => {
      this.animation.playSegments([[0, 20], [20, 10]], true);
      this.animation.loop = true;
    });
  }

  private goToStepSelected(): void {
    this.playSequence(this.steps[this.state]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state']) {
      this.goToStepSelected();
    }
  }

  ngOnDestroy(): void {
    console.log('on destroy');
    this.isReady.next(false);
    this.animation.destroy();
  }
}
