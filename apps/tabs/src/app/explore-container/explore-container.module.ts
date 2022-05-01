import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';
import { SharedComponentLibraryModule } from 'libs/shared-component-library/src';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, SharedComponentLibraryModule],
  declarations: [ExploreContainerComponent],
  exports: [ExploreContainerComponent]
})
export class ExploreContainerComponentModule {}
