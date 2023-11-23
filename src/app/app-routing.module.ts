import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/shared/home/home.component";
import {CourseListComponent} from "./components/courses/course-list/course-list.component";
import {CourseFormComponent} from "./components/courses/course-form/course-form.component";
import {CourseEditComponent} from "./components/courses/course-edit/course-edit.component";
import {UserRegisterComponent} from "./components/user/user-register/user-register.component";
import {ForbiddenComponent} from "./components/shared/forbidden/forbidden.component";
import {AuthGuard} from "./guards/authGuard";
import { AddCardComponent } from './components/payment/add-card/add-card.component';
import { PlanComponent } from './components/shared/plan/plan.component';
import { ViewPaymentComponent } from './components/payment/view-payment/view-payment.component';
import { UserSubscriptionComponent } from './components/payment/user-subscription/user-subscription.component';

import {SectionFormComponent} from "./components/courses/section-form/section-form.component";
import { AssignmentFormComponent } from './components/assignments/assignment-form/assignment-form.component';
import {AddClassComponent} from "./components/courses/add-class/add-class.component";
import {ClassVideoComponent} from "./components/courses/class-video/class-video.component";
import {ClassFormComponent} from "./components/courses/class-form/class-form.component";
import { AssignmentListComponent } from './components/assignments/assignment-list/assignment-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'courses', component: CourseListComponent, canActivate: [AuthGuard],
    data: {
      roles: ['CREATE-COURSES']}
  },

  { path: 'courses/create', component: CourseFormComponent},

  { path: 'courses/:id/edit', component: CourseEditComponent},
  { path: 'register' ,component: UserRegisterComponent},
  { path: 'forbidden', component: ForbiddenComponent},
  { path: 'add-card', component: AddCardComponent},
  { path: 'plans', component: PlanComponent},
  { path: 'user-subscriptions', component: UserSubscriptionComponent},
  {path: 'subscription/create',component: ViewPaymentComponent},
  {path: 'courses/:id/sections',component: SectionFormComponent},
  {path: 'courses/:id/assignment/create',component: AssignmentFormComponent},
  {path: 'courses/:id/assignment', component: AssignmentListComponent},

  {path: 'courses/:id/sections/:secId/class-form',component: ClassFormComponent,
    children:[
      {path: 'add-class',component: AddClassComponent},
      {path: 'add-video',component: ClassVideoComponent}

    ]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
