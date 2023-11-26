import {Component, inject, OnInit} from '@angular/core';
import {ClassService} from "../../../services/class.service";
import {UrlDto} from "../../../model/dto/UrlDto";
import {ActivatedRoute} from "@angular/router";
import {timeout} from "rxjs";
import {MessageService} from "primeng/api";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-student-video',
  templateUrl: './student-video.component.html',
  styleUrls: ['./student-video.component.css']
})
export class StudentVideoComponent implements OnInit{

  private classService: ClassService = inject(ClassService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private kcService: KeycloakService = inject(KeycloakService);


  classId = this.activatedRoute.snapshot.params['classId'];
  classFile!: UrlDto;

  constructor() {

  }

  ngOnInit() {
    //wait for 1 second and then get the class file
    setTimeout(() => {
      this.classService.findUrlByClassId(this.classId).subscribe(
        (response) => {
          this.classFile = response.response;
        }
      )
    }, 1000);

  }
  onEnd(){
    const userKcId = this.kcService.getKeycloakInstance().subject;
    console.log("Video ended");
    const progressMessageDto = {
        classId: this.classId,
        userKeyCloakId: userKcId,
        courseId: this.activatedRoute.snapshot.params['courseId']
    }
    this.classService.sendProgressNotification(progressMessageDto).subscribe(
      (response) => {
        console.log(response);
      }
    )

    console.log(progressMessageDto);

  }

}
