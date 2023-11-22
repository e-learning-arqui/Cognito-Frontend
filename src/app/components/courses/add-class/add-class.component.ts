import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CourseService} from "../../../services/course.service";
import {ClassService} from "../../../services/class.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent {


  private formBuilder: FormBuilder = inject(FormBuilder);
  private classService: ClassService = inject(ClassService);
  private router : Router = inject(Router);
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  classForm!: FormGroup;
  constructor() {
    this.classForm = this.formBuilder.group({
      title: [''],
      description: [''],
      duration: [100],
    });
  }

  onSubmit() {
    const sectionId = this.activeRoute.snapshot.parent?.params['secId'];
    console.log(sectionId);
    const classDto = {
      title: this.classForm.value.title,
      description: this.classForm.value.description,
      duration: this.classForm.value.duration,
      sectionId: sectionId

    }
    this.classService.saveClass(classDto, sectionId).subscribe(
      (response) => {
        this.classService.setClassId(response.response);
        console.log(response.response);
        console.log(this.classService.getClassId());

        // Mueve la navegación aquí, dentro del callback de suscripción


      }
    );
  }

}
