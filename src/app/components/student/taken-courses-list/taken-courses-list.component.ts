import {Component, inject} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {LanguageService} from "../../../services/language.service";
import {LevelService} from "../../../services/level.service";
import {KeycloakService} from "keycloak-angular";
import {LanguageDto} from "../../../model/dto/LanguageDto";
import {LevelDto} from "../../../model/dto/LevelDto";
import {CategoryDto} from "../../../model/dto/CategoryDto";
import {Course} from "../../../model/Course";
import {CourseRepository} from "../../../store/coursesStore";
import {CourseService} from "../../../services/course.service";
import {MessageService} from "primeng/api";
import {StudentCoursesRepository} from "../../../store/studentCoursesStore";
import {PaginatorState} from "primeng/paginator";
import {CourseAndProgress} from "../../../model/CourseAndProgress";

@Component({
  selector: 'app-taken-courses-list',
  templateUrl: './taken-courses-list.component.html',
  styleUrls: ['./taken-courses-list.component.css']
})
export class TakenCoursesListComponent {
  selectedCategory?: number;
  selectedLanguage?: number;
  selectedLevel?: number;
  searchTerm: string = '';
  categoryService : CategoryService = inject(CategoryService);
  languageService : LanguageService = inject(LanguageService);
  levelService : LevelService = inject(LevelService);
  keycloak: KeycloakService = inject(KeycloakService);
  KEYCLOAK_ID = this.keycloak.getKeycloakInstance().subject;

  languages: LanguageDto[] | undefined;
  levels: LevelDto[] | undefined;
  categories: CategoryDto[] | undefined;
  first = 0;
  course$ = this.studentRepo.studentCourses$;
  maxSize = 0;
  courses : CourseAndProgress[] = [];
  totalElements = 0;
  rows: number | undefined = 6;
  constructor(private studentRepo: StudentCoursesRepository, private courseService: CourseService) {
    this.courseService.getStudentCourses(this.KEYCLOAK_ID!,0, this.rows!).subscribe(
      (response) => {
        //this.courses = response.response.content;
        this.studentRepo.setCourses(response.response);

      }
    )
    this.course$.subscribe((response) => {
      const courseProps = this.studentRepo.getStudentCourseProps();
      this.maxSize = courseProps.totalPages;
      this.totalElements = courseProps.totalElements;
      this.courses = response;
    });
  }
  ngOnInit() {
    this.getCategories();
    this.getLanguages();
    this.getLevels();
    //this.courseService.getCourses2(0, 5);
    this.course$.subscribe((response) => {
      const courseProps = this.studentRepo.getStudentCourseProps();
      this.maxSize = courseProps.totalPages;
      this.totalElements = courseProps.totalElements;
      this.courses = response;
      console.log(response, " courses");
    });

  }


  onPageChange(event: PaginatorState) {
    this.first = event.first!;
    this.rows = event.rows;
    this.courseService.getStudentCourses(this.KEYCLOAK_ID!, event.page!, this.rows!).subscribe(
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

    this.courseService.getStudentCourses(this.KEYCLOAK_ID!,0, this.rows!, filters).subscribe((response) => {
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
}
