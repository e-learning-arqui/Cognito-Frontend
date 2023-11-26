import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../../services/course.service";
import {SectionDto} from "../../../model/dto/SectionDto";
export interface SectionUI extends SectionDto{
  icon: string;
  color?: string;
}
@Component({
  selector: 'app-student-sections',
  templateUrl: './student-sections.component.html',
  styleUrls: ['./student-sections.component.css']
})



export class StudentSectionsComponent {

  private activeRoute : ActivatedRoute = inject(ActivatedRoute);
  private courseService: CourseService = inject(CourseService);
  icon = 'pi pi-book';
  color = '#FF9800';
  sections!: SectionDto[]
  sectionsUI: SectionUI[] = [];
  courseName!: string;
  constructor() {
    console.log(this.activeRoute.snapshot.params['courseId']);
    this.courseService.getSectionsByCourseId(this.activeRoute.snapshot.params['courseId']).subscribe(
      data => {
        this.sections = data.response;

        this.sections.map(section => {
          let sectionUI: SectionUI = {
            id: section.id,
            courseId: section.courseId,
            title: section.title,
            description: section.description,
            status: section.status,
            icon: 'pi pi-folder',
            color: 'blue'
          }
          console.log(sectionUI);
          this.sectionsUI.push(sectionUI);
        })
      }
    )

    this.courseService.getCourseById(this.activeRoute.snapshot.params['courseId']).subscribe(
      data => {
        this.courseName = data.response.title;
      }
    )

  }





}
