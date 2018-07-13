import {
  Component,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as Lottie from 'lottie-web';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'lottiery-button',
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class LottieryButton implements AfterViewInit, OnDestroy {
  @Input() path: string;
  @Input() firstState: [number, number];
  @Input() lastState: [number, number];
  @Input() speed: number;

  @Output() complete: EventEmitter<void>;

  @ViewChild('lottieryContainer') container: ElementRef;

  private animation: any;
  private state = false;

  private isReady$: BehaviorSubject<boolean>;
  private onDestroy$: Subject<boolean>;

  constructor() {
    this.complete = new EventEmitter<void>();

    this.isReady$ = new BehaviorSubject<boolean>(false);
    this.onDestroy$ = new Subject<boolean>();
  }

  ngAfterViewInit(): void {
    this.create();
    this.addListeners();
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
  }

  addListeners() {
    this.animation.addEventListener('DOMLoaded', () => {
      this.isReady$.next(true);
    });

    this.createObservable<void>('complete')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(_ => this.complete.emit(null));
  }

  @HostListener('click')
  onClick(): void {
    this.isReady$.pipe(filter(state => state === true)).subscribe(() => {
      this.animation.setDirection(this.state ? -1 : 1);
      this.animation.play();
      /* this.animation.playSegments(
        this.state ? this.lastState : this.firstState,
        true
      ); */

      this.state = !this.state;
    });
  }

  private createObservable<T>(eventName: string): Observable<T> {
    const event: Subject<T> = new Subject<T>();

    this.animation.addEventListener(eventName, () => {
      event.next();
    });

    return event;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
  }
}
