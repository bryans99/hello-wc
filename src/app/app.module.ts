import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  declarations: [AppComponent],
})
export class AppModule {
  ngDoBootstrap() {}
}
