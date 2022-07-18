import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { ChartComponent } from './chart/chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'chart', component: ChartComponent },
  //{ path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
