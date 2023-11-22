import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CourseService} from "../../../services/course.service";
import {ClassService} from "../../../services/class.service";

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent {


  private formBuilder: FormBuilder = inject(FormBuilder);
  private classService: ClassService = inject(ClassService);
  classForm!: FormGroup;
  constructor() {
    this.classForm = this.formBuilder.group({
      title: [''],
      description: [''],
      duration: [100],
    });
  }

  onSubmit() {
    const classDto = this.classForm.value;
    const sectionId = this.classService.getSectionUrl();
    this.classService.saveClass(classDto, sectionId).subscribe((response) => {
      console.log(response);
    }
    );
  }

}
