import {
  Component,
  ContentChild,
  AfterContentInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { LottieryStateView, Step } from 'projects/lottiery-lib/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(LottieryStateView)
  stateView: LottieryStateView;

  autoPlay = false;
  loop = true;
  speed = 1.5;
  steps: Step[] = [
    {
      from: 0,
      to: 33,
      loop: true
    },
    {
      from: 33,
      to: 0,
      loop: false
    }
  ];

  state = 0;

  onComplete(): void {
    console.log('completed animation');
  }
}
