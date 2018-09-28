import {
  Component,
  ContentChild,
  AfterContentInit,
  AfterViewInit,
  ViewChild,
  OnInit
} from '@angular/core';
import {
  LottieryStateView,
  Step,
  Frame
} from 'projects/lottiery-lib/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(LottieryStateView)
  stateView: LottieryStateView;

  autoPlay = false;
  loop = true;
  speed = 1.5;
  steps: Step[] = [
    {
      from: Frame.CURRENT,
      to: 118,
      loop: false
    },
    {
      from: Frame.CURRENT,
      to: 20,
      loop: true
    },
    {
      from: Frame.CURRENT,
      to: 0,
      loop: false
      // speed: 0.8
    }
  ];

  state = 1;

  ngOnInit(): void {
    /*  setTimeout(() => {
      this.state = 1;
      console.log('changed');
    }, 2000);

    setTimeout(() => {
      this.state = 2;
    }, 20000); */
  }

  onComplete(): void {
    console.log('completed animation');
  }
}
