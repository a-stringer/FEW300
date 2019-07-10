import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { NavComponent } from './components/nav/nav.component';
import { MathModule } from './features/math/math.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FourOhFourComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    MathModule,
    AppRoutingModule // After Feature Modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
