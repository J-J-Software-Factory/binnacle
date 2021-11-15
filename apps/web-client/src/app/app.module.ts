import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebClientShellModule } from '@nx-admin-starter/web-client/shell';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WebClientShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
