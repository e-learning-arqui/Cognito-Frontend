import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentDto } from 'src/app/model/dto/AssignmentDto';
import { AssignmentService } from 'src/app/services/assignment.service';
import { AssignmentStore } from 'src/app/store/assignmentStore';
import {ConfirmationService, MessageService, SelectItemGroup} from "primeng/api";
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent {
  assignmentService: AssignmentService= inject(AssignmentService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  keycloak : KeycloakService = inject(KeycloakService);


  confirmationService: ConfirmationService = inject(ConfirmationService);
  messageService: MessageService = inject(MessageService);

  constructor(
    public assignmentStore: AssignmentStore,
    private router: Router

  ){} 

  ngOnInit(): void{
    this.assignmentService.getAssignments(this.route.snapshot.params['id']).subscribe();
  }

  onSubscribe( assignment: AssignmentDto){
    this.router.navigate(['/courses',{ assignmentId: assignment.id }]); 
  }


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

}
