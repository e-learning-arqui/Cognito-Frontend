import {Component, inject} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent {
  private courseService: CourseService = inject(CourseService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  file: File | undefined;
  courseName: string = '';

  ngOnInit(): void {
    let id = -1;

    this.route.params.subscribe(params => {

      id = params['id'];

    });
    this.courseService.getCourseById(id).subscribe((response) => {
      this.courseName = response.response.title;
      console.log(this.courseName);
    });
  }

  onChanges(event: Event): void {

    // @ts-ignore
    this.file = (event.target as HTMLInputElement).files[0];


  }
  onUpload(): void {
    this.courseService.uploadLogo(this.file!,this.courseName).subscribe((response) => {
      console.log(response);
    });
  }
}
