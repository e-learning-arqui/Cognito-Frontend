import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentDto } from 'src/app/model/dto/AssignmentDto';
import { AssignmentService } from 'src/app/services/assignment.service';
import { AssignmentStore } from 'src/app/store/assignmentStore';
import {ConfirmationService, MessageService, SelectItemGroup} from "primeng/api";
import { KeycloakService } from 'keycloak-angular';
import { DatePipe } from '@angular/common';
import { SectionDto } from 'src/app/model/dto/SectionDto';
import { CourseService } from 'src/app/services/course.service';
import { ScoreDto } from 'src/app/model/dto/ScoreDto';



@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent {
  displayScoreModal: boolean = false;
  scoreDto: ScoreDto | null = null;
  assignmentService: AssignmentService= inject(AssignmentService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  keycloak : KeycloakService = inject(KeycloakService);
  sections: SectionDto[] = [];
  sectionsMap: { [sectionId: number]: AssignmentDto[] } = {};



  confirmationService: ConfirmationService = inject(ConfirmationService);
  messageService: MessageService = inject(MessageService);

  constructor(
    public assignmentStore: AssignmentStore,
    private router: Router,
    private courseService: CourseService,
  ){} 

  ngOnInit(): void{
    const courseId = this.route.snapshot.params['id'];
    //this.assignmentService.getAssignments(courseId).subscribe();
    this.assignmentService.getAssignments(courseId).subscribe(assignments => {
      this.courseService.findSectionsById(courseId).subscribe(sections => {
        this.sections = sections.response;
        this.initializeSectionsMap(sections.response, assignments);
      });
    });
  }
/*
  onSubscribe( assignment: AssignmentDto){
    this.router.navigate(['/courses',{ assignmentId: assignment.id }]); 
  }
*/

  confirm(event: Event, assignmentId: number){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de tomar la evaluación? Una vez dentro no podrás tomarla de nuevo',
      icon: 'pi pi-check-square',
      accept: () => {
        this.assignmentService.getVerification(assignmentId,this.keycloak.getKeycloakInstance().subject!).subscribe((response) => {
          if(response.response === false){

            this.assignmentService.updateVerification(assignmentId,this.keycloak.getKeycloakInstance().subject!).subscribe((response)=>{
              console.log("update verif works")
            });
            this.router.navigate([`/assignment/${assignmentId}`]).then(r => console.log(r));
          }else {
            this.messageService.add({severity:'error', summary:'Error', detail:'Usted ya realizó la prueba'});

          }
        }); 
      },
      reject: () => {
        this.messageService.add({severity:'error', summary:'Cancelado', detail:'Se cancelo el tomar la evaluación'});
      }
    });
  }



  private initializeSectionsMap(sections: SectionDto[], assignments: AssignmentDto[]): void {
    // Inicializar el mapa de secciones con arrays vacíos
    sections.forEach(section => {
      if (typeof section.id !== 'undefined') {
        this.sectionsMap[section.id] = [];
      }
    });
  
    // Asignar cada examen a su sección correspondiente
    assignments.forEach(assignment => {
      if (typeof assignment.sectionId !== 'undefined' && this.sectionsMap.hasOwnProperty(assignment.sectionId)) {
        this.sectionsMap[assignment.sectionId].push(assignment);
      }
    });
  }
  
  getAssignmentsBySection(sectionId?: number): AssignmentDto[] {
    if (typeof sectionId === 'undefined') {
      return [];
    }
    return this.sectionsMap[sectionId] || [];
  }
  showScore(assignmentId: number) {
    const keycloakId = this.keycloak.getKeycloakInstance().subject!;
    this.assignmentService.getScore(assignmentId, keycloakId).subscribe(response => {
        if (response.response.score !== -1) {
            this.scoreDto = response.response;
        } else {
            this.scoreDto = null;
        }
        this.displayScoreModal = true;
    });
} 

}
