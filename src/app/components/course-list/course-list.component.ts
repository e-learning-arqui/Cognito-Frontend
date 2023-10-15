import {Component, inject} from '@angular/core';
import {CourseRepository} from "../../store/coursesStore";
import {CourseService} from "../../services/course.service";
import {Course} from "../../model/Course";
import {PaginatorState} from "primeng/paginator";
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

  private courseRepo: CourseRepository = inject(CourseRepository);
  private courseService: CourseService = inject(CourseService);
  first = 0;
  rows: number = 0;
  course$ = this.courseRepo.course$;
  maxSize = 0;
  courses : Course[] = [];
  totalElements = 0;
  ngOnInit() {
    this.courseService.getCourses(0, 2).subscribe((response) => {
      console.log(response.response);
this.courses = (response.response.content);
    });
    // this.courseService.getCourses2(0, 5);
    this.course$.subscribe((response) => {
      const courseProps = this.courseRepo.getCourseProps();
      this.maxSize = courseProps.totalPages;
      this.rows = 2;
      this.totalElements = courseProps.totalElements;
    });

  }
  onPageChange(event: PageEvent) {
    this.first = event.first!;
    this.rows = event.rows!;
  }



}
