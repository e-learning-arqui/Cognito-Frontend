import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StreamService } from 'src/app/services/stream.service';
import { StreamStore } from 'src/app/store/streamStore';
@Component({
  selector: 'app-create-stream',
  templateUrl: './create-stream.component.html',
  styleUrls: ['./create-stream.component.css'],
  
})
export class CreateStreamComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  keycloak : KeycloakService = inject(KeycloakService);
  streamService: StreamService= inject(StreamService);  

  confirmationService: ConfirmationService = inject(ConfirmationService);
  messageService: MessageService = inject(MessageService);
  constructor(
    public streamStore: StreamStore,
    private router: Router

  ){} 

  ngOnInit(): void{
    this.streamService.getKeys(this.route.snapshot.params['id']).subscribe();
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
  

}
