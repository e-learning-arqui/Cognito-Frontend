import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/shared/home/home.component";
import {CourseListComponent} from "./components/course-list/course-list.component";
import {CourseFormComponent} from "./components/courses/course-form/course-form.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'courses', component: CourseListComponent},
  { path: 'courses/create', component: CourseFormComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
