import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/shared/home/home.component";
import {CourseListComponent} from "./components/courses/course-list/course-list.component";
import {CourseFormComponent} from "./components/courses/course-form/course-form.component";
import {CourseEditComponent} from "./components/courses/course-edit/course-edit.component";
import {UserRegisterComponent} from "./components/user/user-register/user-register.component";
import {SubscriptionComponent} from "./components/shared/subscription/subscription.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'courses', component: CourseListComponent},
  { path: 'courses/create', component: CourseFormComponent},
  { path: 'courses/:id/edit', component: CourseEditComponent},
  { path: 'register' ,component: UserRegisterComponent},
  { path: 'subscription', component: SubscriptionComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
