import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { webClientShellRoutes } from './web-client-shell.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(webClientShellRoutes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class WebClientShellModule {}
