import {Component, inject, OnInit} from '@angular/core';
import {CourseProps, CourseRepository} from "../../../store/coursesStore";
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../model/Course";
import {first} from "rxjs";
import { CategoryService } from 'src/app/services/category.service';
import { LanguageService } from 'src/app/services/language.service';
import { LevelService } from 'src/app/services/level.service';
import { LanguageDto } from 'src/app/model/dto/LanguageDto';
import { LevelDto } from 'src/app/model/dto/LevelDto';
import { CategoryDto } from 'src/app/model/dto/CategoryDto';
import {KeycloakService} from "keycloak-angular";
import {Message, MessageService} from "primeng/api";
import { Router } from '@angular/router';
interface PaginatorState{
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;

}
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  providers: [MessageService]
})


export class CourseListComponent{
  selectedCategory?: number;
  selectedLanguage?: number;
  selectedLevel?: number;
  searchTerm: string = '';
  categoryService : CategoryService = inject(CategoryService);
  languageService : LanguageService = inject(LanguageService);
  levelService : LevelService = inject(LevelService);
  keycloak: KeycloakService = inject(KeycloakService);
  router: Router= inject(Router)
  // private courseRepo: CourseRepository = inject(CourseRepository);
  // private courseService: CourseService = inject(CourseService);

  languages: LanguageDto[] | undefined;
  levels: LevelDto[] | undefined;
  categories: CategoryDto[] | undefined;
  first = 0;
  course$ = this.courseRepo.course$;
  maxSize = 0;
  courses : Course[] = [];
  totalElements = 0;
  rows: number | undefined = 6;
  constructor(private courseRepo: CourseRepository, private courseService: CourseService, private messageService: MessageService) {
    this.courseService.getCourses( 0, this.rows!  ).subscribe(
      (response) => {
        this.courses = response.response.content;
        console.log(response.response.content, " response back from server");
        //this.courseRepo.setCourses(response.response);
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
    this.getCategories();
    this.getLanguages();
    this.getLevels();
    //this.courseService.getCourses2(0, 5);
    this.course$.subscribe((response) => {
      const courseProps = this.courseRepo.getCourseProps();
      this.maxSize = courseProps.totalPages;
      this.totalElements = courseProps.totalElements;
      this.courses = response;
      console.log(this.courses, " student courses");
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



  getCategories() {
    this.categoryService.getAllCategories().subscribe((response) => {
     this.categories = response.response || [];
    });
  }

  getLanguages() {
    this.languageService.getLanguages().subscribe((response) => {
      this.languages = response.response;
    });
  }

  getLevels(){
    this.levelService.getAllLevels().subscribe((response) => {
      this.levels = response.response;
    });
  }

  applyFilters() {
    const filters = {
      title: this.searchTerm,
      languageId: this.selectedLanguage,
      levelId: this.selectedLevel,
      categoryId: this.selectedCategory
    };

    this.courseService.getCourses(0, this.rows!, filters).subscribe((response) => {
      this.courses = response.response.content;

      // Actualizar totalElements y resetear la paginación.
      this.totalElements = response.response.totalElements;
      if (this.totalElements === 0) {
        this.first = 0;
        this.courses = [];
      }
    });
  }

  clearFilters() {
    this.selectedCategory = undefined;
    this.selectedLanguage = undefined;
    this.selectedLevel = undefined;
    this.searchTerm = '';

    this.applyFilters();
  }

  subToCourse(courseTitle: string) {
    const keycloakId = this.keycloak.getKeycloakInstance().subject;
    this.courseService.subToCourse(courseTitle, keycloakId!).subscribe((response) => {
      if(response.code == '0000'){
        this.messageService.add({ key: 'tc', severity:'success', summary: 'Success', detail: `Te has suscrito al curso ${courseTitle}!`});
      }

    });
  }

  goToSections(id: number){
    this.router.navigate([`courses/${id}/sections`])

  }


}
