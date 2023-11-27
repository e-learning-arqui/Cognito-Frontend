import {Component, inject} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService, TreeNode} from "primeng/api";
import {ClassDto} from "../../../model/dto/ClassDto";
import {LevelDto} from "../../../model/dto/LevelDto";
import {CategoryDto} from "../../../model/dto/CategoryDto";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../../services/course.service";
import {SectionDto} from "../../../model/dto/SectionDto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {ClassService} from "../../../services/class.service";
import { StreamService } from 'src/app/services/stream.service';
import { ChangeDetectorRef } from '@angular/core';


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
  private classService: ClassService = inject(ClassService);
  private router : Router = inject(Router);
  streamService: StreamService= inject(StreamService);  

  confirmationService: ConfirmationService = inject(ConfirmationService);
  messageService: MessageService = inject(MessageService);


  sections!: TreeNode<any>[];
  cols!: Column[];
  subscription!: Subscription;


  private route: ActivatedRoute = inject(ActivatedRoute);
  newSectionForm!: FormGroup;
  dialogVisible: boolean = false;

  classes: ClassDto[] = [];


  file: File | undefined;


  constructor(private cdr: ChangeDetectorRef) {
    this.newSectionForm = this.formBuilder.group({
      title: [''],
      description: [''],
    });

    this.classService.setSectionUrl(this.route.snapshot.params['id']);

    this.findClassesByCourseId(this.route.snapshot.params['id'])
  }

  ngOnInit(){

    let id = -1;

    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.courseService.findSectionsById(id).subscribe(
      data => {
        // @ts-ignore
        this.sections = data.response!.map((section: SectionDto) => {
          return {
            key: section.id,
            label: section.title,
            data: section,
            children:[
              {key: `${section.id}-1`, label: 'Hola', data: 'Hola', children: []},
            ]
          };
        });
      }
    );
    this.cols = [
      {field: 'title', header: 'Título'},
      {field: 'description', header: 'Descripción'},

    ]
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    this.ngOnInit();
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

  addVideo(sectionId: number){
    const courseId = this.route.snapshot.params['id'];
    this.classService.setSectionUrl(sectionId);

    this.router.navigate([`courses/${courseId}/sections/${sectionId}/class-form`]);
    console.log(sectionId);
  }

  findClassesByCourseId(courseId: number){
    this.courseService.findClassesByCourseId(this.route.snapshot.params['id']).subscribe(
      data => {
        this.classes = data.response;
      }
    )
  }

  goToclassList(sectionId: number){
    this.classService.setSectionUrl(sectionId);
    this.router.navigate([`courses/${this.route.snapshot.params['id']}/sections/${sectionId}/classes`]);
  }

  confirm(event: Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de iniciar un live?',
      icon: 'pi pi-check-square',
      accept: () => {
        this.streamService.getVerification(this.route.snapshot.params['id']).subscribe((response) => {
          if(response.response === false){
              console.log("creando canal")
              this.streamService.createChannel(this.route.snapshot.params['id']).subscribe((response)=>{
                console.log("channel created")
              });              
          }
          this.goToOtherApp(); 
        }); 
      },
      reject: () => {
        this.messageService.add({severity:'error', summary:'Cancelado', detail:'Se cancelo el iniciar el live'});
      }
    });
  }

  goToOtherApp(): void {
    const courseId = this.route.snapshot.params['id']; // Obtén el id del curso
    window.location.href = `http://localhost:3000/?courseId=${courseId}`; // Redirige a React con el id en la URL
  }

  addAssignment(){
    this.router.navigate([`courses/${this.route.snapshot.params['id']}/assignment/create`]);
  }

  viewAssignment(){
    this.router.navigate([`courses/${this.route.snapshot.params['id']}/assignment`]);

  }

  goToLives(){
    this.router.navigate([`courses/${this.route.snapshot.params['id']}/live/view`]);

  }

}



