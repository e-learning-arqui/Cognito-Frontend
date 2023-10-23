import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SubCategoryDto} from "../../../model/dto/SubCategoryDto";
import {LanguageDto} from "../../../model/dto/LanguageDto";
import {LevelDto} from "../../../model/dto/LevelDto";
import {Message} from "primeng/api";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  message : Message[] | undefined;
  formGroup!: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);
  isPasswordValid: boolean = false;
  constructor() {
  }
  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      firstName: new FormControl<string>(''),
      lastName: new FormControl<String | null>(null),
      username: new FormControl<string>(''),
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
      this.displayMessage("La contraseña debe contener al menos un número", "error");
    }
    if(this.formGroup.get('password')?.value != this.formGroup.get('confirmPassword')?.value){
      this.displayMessage("Las contraseñas no coinciden", "error");
    }
  }
  displayMessage(message: string, severity: string){
    this.message = [{ severity: severity, summary: 'Error!', detail: message }];
  }


}

