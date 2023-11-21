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
  {path: 'subscription/create',component: ViewPaymentComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
