import {Component, inject, OnInit} from '@angular/core';
import {CourseRepository} from "../../../store/coursesStore";
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../model/Course";
import {first} from "rxjs";
interface PaginatorState{
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;

}
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})


export class CourseListComponent{

  // private courseRepo: CourseRepository = inject(CourseRepository);
  // private courseService: CourseService = inject(CourseService);

  first = 0;
  course$ = this.courseRepo.course$;
  maxSize = 0;
  courses : Course[] = [];
  totalElements = 0;
  rows: number | undefined = 3;
  constructor(private courseRepo: CourseRepository, private courseService: CourseService) {
    this.courseService.getCourses(0, this.rows!).subscribe(
      (response) => {
        this.courses = response.response.content;

      }
    )
    this.course$.subscribe((response) => {
      const courseProps = this.courseRepo.getCourseProps();
      this.maxSize = courseProps.totalPages;
      this.totalElements = courseProps.totalElements;
      //this.courses = response;
    });
  }
  ngOnInit() {

    //this.courseService.getCourses2(0, 5);
    this.course$.subscribe((response) => {
      const courseProps = this.courseRepo.getCourseProps();
      this.maxSize = courseProps.totalPages;
      this.totalElements = courseProps.totalElements;
      this.courses = response;
    });

  }

  onPageChange(event: PaginatorState) {
    this.first = event.first!;
    this.rows = event.rows;
    this.courseService.getCourses(event.page!, this.rows!).subscribe(
      (response) => {
        this.courses = response.response.content;
      }
    )
  }


}
