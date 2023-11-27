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
import { AssignmentComponent } from './components/assignments/assignment/assignment.component';

import {ClassListComponent} from "./components/courses/class-list/class-list.component";
import { StudentRegisterComponent } from './components/user/student-register/student-register.component';
import {TakenCoursesListComponent} from "./components/student/taken-courses-list/taken-courses-list.component";
import {StudentSectionsComponent} from "./components/student/student-sections/student-sections.component";
import {StudentClassesComponent} from "./components/student/student-classes/student-classes.component";
import {StudentVideoComponent} from "./components/student/student-video/student-video.component";

import { CreateStreamComponent } from './components/lives/create-stream/create-stream.component';
import { ViewStreamComponent } from './components/lives/view-stream/view-stream.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'courses', component: CourseListComponent,
    data: {
      roles: ['CREATE-COURSES', 'VIEW-COURSES']}
  },

  { path: 'courses/create', component: CourseFormComponent},

  { path: 'courses/:id/edit', component: CourseEditComponent},
  { path: 'register/professor' ,component: UserRegisterComponent},
  {path: 'register/student', component: StudentRegisterComponent},
  { path: 'forbidden', component: ForbiddenComponent},
  { path: 'add-card', component: AddCardComponent},
  { path: 'plans', component: PlanComponent},
  { path: 'user-subscriptions', component: UserSubscriptionComponent},
  {path: 'subscription/create',component: ViewPaymentComponent},
  {path: 'courses/:id/sections',component: SectionFormComponent},

  {path: 'courses/:id/assignment/create',component: AssignmentFormComponent},
  {path: 'courses/:id/assignment', component: AssignmentListComponent},
  {path: 'assignment/:id',component:AssignmentComponent},

  {path: 'courses/:id/live', component: CreateStreamComponent},
  {path: 'courses/:id/live/view',component: ViewStreamComponent},

  {path: 'courses/:id/sections/:secId/class-form',component: ClassFormComponent,
    children:[
      {path: 'add-class',component: AddClassComponent},
      {path: 'add-video',component: ClassVideoComponent}

    ]},

  { path: 'courses/:id/sections/:secId/classes', component: ClassListComponent},

  {path: 'courses/student/:kcId', component: TakenCoursesListComponent},
  {path: 'student/courses/:courseId/sections', component: StudentSectionsComponent},
  {path: 'student/courses/:courseId/sections/:sectionId/classes', component: StudentClassesComponent},
  {path: 'student/courses/:courseId/sections/:sectionId/classes/:classId', component: StudentVideoComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
