import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CampaignComponent } from './campaign/campaign.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':id',
    component: CampaignComponent,
  },
];
