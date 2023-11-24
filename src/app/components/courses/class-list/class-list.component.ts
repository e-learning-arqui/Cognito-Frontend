import {Component, inject} from '@angular/core';
import {ClassRepository} from "../../../store/classStore";
import {ClassService} from "../../../services/class.service";
import {UrlDto} from "../../../model/dto/UrlDto";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent {


  private classRepo: ClassRepository = inject(ClassRepository);
  private classService: ClassService = inject(ClassService);
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  class$ = this.classRepo.class$;
  files: UrlDto[] = [];
  courseId: number = this.activeRoute.snapshot.params['secId'];
  constructor() {
    this.classService.findClassesByCourseId(this.courseId).subscribe(
      (response) => {
        this.files = response.response;
      }
    )

    this.class$.subscribe((response) => {
      this.files = response;
    }
    )
  }

  protected readonly console = console;
}
