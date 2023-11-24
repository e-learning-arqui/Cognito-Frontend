import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { QuestionDto } from 'src/app/model/dto/QuestionDto';
import { AssignmentService } from 'src/app/services/assignment.service';
import {ConfirmationService, MessageService, SelectItemGroup} from "primeng/api";


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  currentQuestionIndex: number = 0;
  questions: QuestionDto[] = [];

  private route: ActivatedRoute = inject(ActivatedRoute);
  keycloak : KeycloakService = inject(KeycloakService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  messageService: MessageService = inject(MessageService);


  constructor(
    private assignmentService: AssignmentService,
    private router: Router
  ) { }

  ngOnInit() {
    const assignmentId = this.route.snapshot.params['id']; 
    this.loadQuestions(assignmentId);
  }

  loadQuestions(assignmentId: number) {
    this.assignmentService.getQuestions(assignmentId).subscribe({
      next: (response) => {
        this.questions = response.response; 
      },
      error: (err) => {
        console.error(err);
      }
    });
    
 
  }

  goToNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  goToPreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
  selectOption(optionId: number) {
    const currentOptions = this.questions[this.currentQuestionIndex].options;
    
    currentOptions.forEach(opt => opt.isSelected = false);

    const selectedOption = currentOptions.find(opt => opt.id === optionId);
    if (selectedOption) {
        selectedOption.isSelected = true;
    }
  }

  submitAssignment() {
    const keycloakId = this.keycloak.getKeycloakInstance().subject!;
    const assignmentResponses = this.questions.map(question => {
      const selectedOption = question.options.find(option => option.isSelected);
      return {
        optionId: selectedOption ? selectedOption.id : null,
        keycloakId: keycloakId
      };
    }).filter(response => response.optionId !== null);

    const assignmentId = this.route.snapshot.params['id'];
    this.assignmentService.createStudentAssignment(assignmentResponses, assignmentId)
      .subscribe({
        next: (response) => {
          console.log('Respuestas enviadas con éxito', response);
        },
        error: (error) => {
          console.error('Error al enviar respuestas', error);
        }
      });
  }

  confirm(event: Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de enviar la evaluación?',
      icon: 'pi pi-check-square',
      accept: () => {
        this.submitAssignment();
      },
      reject: () => {
        this.messageService.add({severity:'error', summary:'Cancelado', detail:'Se cancelo el envío'});
      }
    });
  }


  

  allQuestionsAnswered() {
    return this.questions.every(question => 
      question.options.some(option => option.isSelected)
    );
  }


 
}