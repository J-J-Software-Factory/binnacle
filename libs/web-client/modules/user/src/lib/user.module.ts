import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverviewPage } from './pages/overview/overview.page';

@NgModule({
  declarations: [OverviewPage],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: OverviewPage }])],
})
export class UserModule {}
