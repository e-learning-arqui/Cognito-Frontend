import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {Course} from "../../../model/Course";
import {CourseService} from "../../../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassService} from "../../../services/class.service";
import {ClassDto} from "../../../model/dto/ClassDto";
import {UrlDto} from "../../../model/dto/UrlDto";

@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.css']
})
export class StudentClassesComponent implements OnInit{
  @ViewChild('myVideo') myVideo!: ElementRef;


  classes!: ClassDto[];

  responsiveOptions: any[] | undefined;
  showVideoModal: boolean = false;

  watchingVideoUrl: string = '';

  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private classService : ClassService = inject(ClassService);
  private router : Router = inject(Router);
  courseId : number = this.activeRoute.snapshot.params['courseId'];
  sectionId : number = this.activeRoute.snapshot.params['sectionId'];
  constructor() {

  }

  ngOnInit(){
    this.classService.findClassesBySectionId(this.sectionId).subscribe((response) => {
    this.classes = response.response;
  }
)
  this.responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

}

  // handlePlayClick(id: number){
  //
  //   //search id in classes and return the url
  //   this.classes.forEach((element) => {
  //     if(element.id == id){
  //       this.watchingVideoUrl = element.url;
  //     }
  //   })
  //
  //   console.log('Botón play clickeado. Realizar alguna acción diferente.');
  //   console.log(this.watchingVideoUrl);
  //
  //   this.myVideo.nativeElement.pause();
  //   this.showVideoModal = true;
  //
  //
  // }



  toVideo(classId: number){
    this.router.navigate(
        [`/student/courses/${this.courseId}/sections/${this.sectionId}/classes/${classId}`]);
  }









}
