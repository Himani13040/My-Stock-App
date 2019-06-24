import { Routes } from '@angular/router';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
{   path: '',
    redirectTo: '/home',
    pathMatch: 'full'
},
{
    path: 'my-dashboard',
    component: MyDashboardComponent,
},
{
    path: 'home',
    component: HomeComponent,
},
];
