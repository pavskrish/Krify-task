import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MeetingComponent } from './meeting/meeting.component';


const routes: Routes = [{
  path: '',
  component: LoginComponent
}, {
  path: 'login',
  component: LoginComponent
},
{
  path: 'home',
  //canActivate: [AuthGuard],
  component: HomeComponent
},
{
  path: 'meeting',
  component: MeetingComponent
},
{
  path: 'meeting/:id',
  component: MeetingComponent
}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
