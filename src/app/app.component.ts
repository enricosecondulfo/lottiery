import {
  Component,
  ContentChild,
  AfterContentInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { LottieryStateView } from 'projects/lottiery-lib/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(LottieryStateView) stateView: LottieryStateView;

  autoPlay = false;
  loop = true;
  speed = 1.5;
  steps = [[0, 33], [33, 0]];
  state = 0;

  numbers: number[];

  onComplete(): void {
    console.log('completed animation');
  }
}
