import {Component, inject} from '@angular/core';
import {TreeNode} from "primeng/api";
import {UserDto} from "../../../model/dto/UserDto";
import {LevelDto} from "../../../model/dto/LevelDto";
import {CategoryDto} from "../../../model/dto/CategoryDto";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../../services/course.service";
import {SectionDto} from "../../../model/dto/SectionDto";
import {FormBuilder, FormGroup} from "@angular/forms";

interface Column{
  field: string;
  header: string;
}

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.css']
})



export class SectionFormComponent {
  private catService: CategoryService = inject(CategoryService);
  private courseService : CourseService = inject(CourseService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  sections!: TreeNode<SectionDto>[];
  cols!: Column[];
  private route: ActivatedRoute = inject(ActivatedRoute);
  newSectionForm!: FormGroup;
  dialogVisible: boolean = false;


  file: File | undefined;

  constructor() {
    this.newSectionForm = this.formBuilder.group({
      title: [''],
      description: [''],
    });
  }

  ngOnInit(){
    let id = -1;

    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.courseService.findAllSections().subscribe(
      data => {
        this.sections = data.response!.map((section: SectionDto) => {
          console.log(section);
          return {
            label: section.title,
            data: section,
            children: []
          };
        });

      }
    );
    this.cols = [
      {field: 'title', header: 'Título'},
      {field: 'description', header: 'Descripción'},

    ]
  }

  showNewSectionDialog() {
    this.dialogVisible = true;
  }

  saveSection() {
    //convert form data to SectionDto
    const courseId = this.route.snapshot.params['id'];
    const newSection: SectionDto = {

      courseId: courseId,
      title: this.newSectionForm.controls['title'].value,
      description: this.newSectionForm.controls['description'].value,
      status: true
    }
    this.courseService.saveSection(newSection, courseId);
  }

  deleteSection(sectionId: number) {
     this.courseService.deleteSection(sectionId);
  }

  onChanges(event: Event): void {

    // @ts-ignore
    this.file = (event.target as HTMLInputElement).files[0];


  }
  onVideoUpload(): void {
    this.courseService.uploadClassVideo(this.file!,1).subscribe((response) => {
      console.log(response);
    });
  }

}



