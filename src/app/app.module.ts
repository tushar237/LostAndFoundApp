import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ServicesApiService } from '../services/services-api.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MyDatePickerModule } from 'mydatepicker';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	FormsModule ,
  HttpModule,
  NoopAnimationsModule,
  MyDatePickerModule
  ],
  providers: [ServicesApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
