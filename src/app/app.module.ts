// * Base
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import AppRoutingModule from './app-routing.module';
import { NgModule } from '@angular/core';

// * Components
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';
import AppComponent from './app.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    BrowserModule,
  ],
})
export default class AppModule {}
