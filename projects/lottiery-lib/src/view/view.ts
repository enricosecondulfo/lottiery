import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
  NgZone,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import * as Lottie from 'lottie-web';
import { Subject, Observable } from '../../../../node_modules/rxjs';
import { takeUntil } from '../../../../node_modules/rxjs/operators';

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

  @Output() complete: EventEmitter<void>;

  @ViewChild('lottieryContainer') container: ElementRef;

  private animation: any;
  private onDestroy$: Subject<boolean>;

  constructor(private ngZone: NgZone) {
    this.complete = new EventEmitter<void>();
    this.onDestroy$ = new Subject<boolean>();
  }

  ngAfterViewInit(): void {
    this.create();
    this.addListeners();
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

  private addListeners(): void {
    this.createObservable<void>('complete')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(_ => this.complete.emit(null));
  }

  private createObservable<T>(eventName: string): Observable<T> {
    const event: Subject<T> = new Subject<T>();

    this.animation.addEventListener(eventName, () => {
      event.next();
    });

    return event;
  }

  ngOnDestroy(): void {
    console.log('on destroy');

    this.animation.destroy();
    this.onDestroy$.next(null);
  }
}
