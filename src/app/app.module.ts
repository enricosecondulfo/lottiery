import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  LottieryViewModule,
  LottieryStateViewModule,
  LottieryButtonModule
} from 'projects/lottiery-lib/src/public_api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LottieryViewModule,
    LottieryStateViewModule,
    LottieryButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
