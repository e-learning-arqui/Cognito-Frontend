import { Component, inject } from '@angular/core';
import {Message} from "primeng/api";
import {UserDto} from "../../../model/dto/UserDto";
import {UserService} from "../../../services/user.service";
import {Form, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent {
  message : Message[] | undefined;
  formGroup!: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  isPasswordValid: boolean = false;


  userService: UserService = inject(UserService);
  constructor(
     private router: Router
  ) {
  }
  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      firstName: new FormControl<string>(''),
      lastName: new FormControl<String | null>(null),
      username: new FormControl<string>(''),
      email: new FormControl<string>(''),
      password: new FormControl<string>(''),
      confirmPassword: new FormControl<string>(''),

    });

  }

  passwordPolicy(): boolean {
    //regex to check if password contains a number
    const passwordRegex = new RegExp("^(?=.*[0-9])");

    const password = this.formGroup.get('password')?.value;
    const confirmPassword = this.formGroup.get('confirmPassword')?.value;
    return passwordRegex.test(password) && password;

  }
  onSubmit() {
    this.isPasswordValid = this.passwordPolicy();
    if (!this.isPasswordValid) {
      this.displayMessage("La contraseña debe contener al menos un número", "error", "Error");
    }
    if(this.formGroup.get('password')?.value != this.formGroup.get('confirmPassword')?.value){
      this.displayMessage("Las contraseñas no coinciden", "error", "Error");
    }
    this.userService.registerStudent(this.toUserDto(this.formGroup)).subscribe(
      (response: any) => {
        console.log(response);
        this.displayMessage("Usuario registrado correctamente", "success", "Éxito");
      }
    );

    console.log(this.toUserDto(this.formGroup));


  }
  displayMessage(message: string, severity: string, summary: string){
    this.message = [{ severity: severity, summary: summary, detail: message }];
  }


  toUserDto(formGroup: FormGroup): UserDto {
    return {
      firstName: formGroup.get('firstName')?.value,
      lastName: formGroup.get('lastName')?.value,
      username: formGroup.get('username')?.value,
      email: formGroup.get('email')?.value,
      password: formGroup.get('password')?.value,
    }

  }
  redirectToProfessorRegistration(){
    this.router.navigate(['register/professor']);
  }
  goToMenu(){
    this.router.navigate(['courses']);
  }


}