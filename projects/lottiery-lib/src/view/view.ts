import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  NgZone,
  ChangeDetectionStrategy
} from '@angular/core';
import * as Lottie from 'lottie-web';

@Component({
  selector: 'lottiery-view',
  templateUrl: './view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LottieryView implements AfterViewInit, OnDestroy {
  @Input() path: string;
  @Input() prerender: string;
  @Input() loop: boolean;
  @Input() autoPlay: boolean;
  @Input() speed: number;

  @ViewChild('lottieryContainer') container: ElementRef;

  private animation: any;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.create();
  }

  create(): void {
    const loop: boolean = this.loop || false;

    const options = {
      container: this.container.nativeElement,
      path: this.path || '',
      prerender: this.prerender || true,
      loop: this.loop || false,
      autoplay: this.autoPlay || false
    };

    this.animation = Lottie.loadAnimation(options);
    this.animation.setSpeed(this.speed || 1);
    this.animation.play();
  }

  ngOnDestroy(): void {
    console.log('on destroy');
    this.animation.destroy();
  }
}
