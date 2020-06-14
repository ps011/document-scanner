import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { Camera } from '@ionic-native/camera/ngx';
import { HomePageRoutingModule } from './home-routing.module';
import {NavigationComponent} from '../navigation/navigation.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, NavigationComponent],
  providers: [
      Camera
  ]
})
export class HomePageModule {}
