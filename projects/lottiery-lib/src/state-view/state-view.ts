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
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Step, Frame } from './step';

@Component({
  selector: 'lottiery-state-view',
  templateUrl: './state-view.html'
})
export class LottieryStateView implements AfterViewInit, OnChanges, OnDestroy {
  @Input()
  path: string;

  @Input()
  prerender: string;

  @Input()
  speed: number;

  @Input()
  steps: Step[];

  @Input()
  state: number;

  @ViewChild('lottieryContainer')
  container: ElementRef;

  private animation: any;

  private isReady$: BehaviorSubject<boolean>;
  private completeAnimation$: Subject<void>;

  private direction = 1;

  constructor() {
    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.completeAnimation$ = new Subject<void>();
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
      this.isReady$.next(true);
    });

    /* this.animation.addEventListener('loopComplete', () => {
      this.direction = this.direction === 1 ? -1 : 1;
      this.animation.stop();
      this.animation.setDirection(this.direction);
      this.animation.play();
      console.log('loop complete');
      console.log(this.direction);
      Lottie.setDirection(this.direction);
      console.log(this.direction);
    }); */
  }

  playSequence(step: Step): void {
    this.isReady$.pipe(filter(state => state === true)).subscribe(() => {
      this.animation.playSegments(
        [
          step.from === Frame.CURRENT
            ? this.animation.currentFrame + this.animation.firstFrame
            : step.from,
          step.to
        ],
        step.forceStart || true
      );

      this.animation.setSpeed(step.speed || 1);
      this.animation.loop = step.loop || false;
    });
  }

  private goToStepSelected(): void {
    this.playSequence(this.steps[this.state])
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state']) {
      this.goToStepSelected();
    }
  }

  ngOnDestroy(): void {
    this.isReady$.next(false);
    this.animation.destroy();
  }
}
