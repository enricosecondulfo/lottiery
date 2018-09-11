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
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Step } from './step';

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
  }

  playSequence(step: Step): void {
    this.isReady.pipe(filter(state => state === true)).subscribe(() => {
      this.animation.playSegments([step.from, step.to], true);
      this.animation.loop = step.loop;
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
