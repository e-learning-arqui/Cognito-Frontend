import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {ConfirmationService, MessageService, SelectItemGroup} from "primeng/api";
import {SubCategoryDto} from "../../../model/dto/SubCategoryDto";
import {LanguageDto} from "../../../model/dto/LanguageDto";
import {LanguageService} from "../../../services/language.service";
import {LevelService} from "../../../services/level.service";
import {LevelDto} from "../../../model/dto/LevelDto";
import {KeycloakService} from "keycloak-angular";
import {CourseDto} from "../../../model/dto/CourseDto";
import {CourseService} from "../../../services/course.service";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {

  //Services injection
  categoryService : CategoryService = inject(CategoryService);
  languageService : LanguageService = inject(LanguageService);
  levelService : LevelService = inject(LevelService);
  keycloak : KeycloakService = inject(KeycloakService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  messageService: MessageService = inject(MessageService);
  courseService: CourseService = inject(CourseService);

  groupedCategories: SelectItemGroup[] = [];

  languages: LanguageDto[] | undefined;
  levels: LevelDto[] | undefined;
  formGroup! : FormGroup;

  formBuilder: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.getCategories();
    this.getLanguages();
    this.getLevels();
    this.formGroup = this.formBuilder.group({
      selectedSubCategory: new FormControl<SubCategoryDto | null>(null),
      selectedLanguage: new FormControl<LanguageDto | null>(null),
      selectedLevel: new FormControl<LevelDto | null>(null),
      description: new FormControl<string>(''),
      title: new FormControl<string>(''),
      duration: new FormControl<number>(0),
    });
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((response) => {
      const categories = response.response;

      categories?.forEach((category) => {
        const groupItem: SelectItemGroup = {
          label: category.categoryName,
          value: category.categoryId,
          items: []
        };

        this.getSubCategoriesByCategoryId(category.categoryId, groupItem);
      });
    });
  }
  getSubCategoriesByCategoryId(categoryId: number, groupItem: SelectItemGroup) {
    this.categoryService.getSubCategoriesByCategoryId(categoryId).subscribe((response) => {
      const subCategories = response.response;

      subCategories?.forEach((subCategory) => {
        groupItem.items.push({
          label: subCategory.subCategoryName,
          value: subCategory
        });
      });

      this.groupedCategories.push(groupItem);
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

  onSubmit() {
    console.log(this.formGroup.value);
   console.log(this.toCourseDto(this.formGroup));
  }

  confirm(event: Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro?',
      icon: 'pi pi-check-square',
      accept: () => {
        this.messageService.add({severity:'success', summary:'Confirmado', detail:'Curso creado exitosamente!'});
        this.onSubmit();
        this.courseService.createCourse(this.toCourseDto(this.formGroup)).subscribe((response) => {
          console.log(response.response);
        }
        )

      },
      reject: () => {
        this.messageService.add({severity:'error', summary:'Cancelado', detail:'Se cancelo la creación del curso!'});
      }
    });
  }

  toCourseDto(formGroup: FormGroup) : CourseDto{
    return {
      title: formGroup.value.title,
      description: formGroup.value.description,
      duration: formGroup.value.duration,
      subCategoryId: formGroup.value.selectedSubCategory?.idSubCategory,
      languageId: formGroup.value.selectedLanguage?.languageId,
      levelId: formGroup.value.selectedLevel?.levelId,
      professorKeycloakId:  this.keycloak.getKeycloakInstance().subject!,
      amount: 100,
      version: 1


    }
  }





}
