import { NgModule } from '@angular/core';
import { LottieryStateViewModule } from '../state-view/state-view.module';
import { LottieryButton } from './button';

@NgModule({
  imports: [LottieryStateViewModule],
  declarations: [LottieryButton],
  exports: [LottieryButton]
})
export class LottieryButtonModule {}
