import {NgModule, APP_INITIALIZER, forwardRef} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import {TabMenuModule} from "primeng/tabmenu";
import { HomeComponent } from './components/shared/home/home.component';
import {MenubarModule} from "primeng/menubar";
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import {DataViewModule} from "primeng/dataview";
import {RouterModule} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {PaginatorModule} from "primeng/paginator";
import { CourseFormComponent } from './components/courses/course-form/course-form.component';
import {InputTextModule} from "primeng/inputtext";
import {NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToastModule} from "primeng/toast";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService, MessageService} from "primeng/api";
import {CardModule} from "primeng/card";
import { FormsModule } from '@angular/forms';
import {FileUploadModule} from "primeng/fileupload";
import { CourseEditComponent } from './components/courses/course-edit/course-edit.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import { ForbiddenComponent } from './components/shared/forbidden/forbidden.component';
import { AddCardComponent } from './components/payment/add-card/add-card.component';
import { PlanComponent } from './components/shared/plan/plan.component';
import { ViewPaymentComponent } from './components/payment/view-payment/view-payment.component';
import { UserSubscriptionComponent } from './components/payment/user-subscription/user-subscription.component';
import { SectionFormComponent } from './components/courses/section-form/section-form.component';
import {TreeTableModule} from "primeng/treetable";
import {DialogModule} from "primeng/dialog";
import {StepsModule} from "primeng/steps";
import { AddClassComponent } from './components/courses/add-class/add-class.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'cognito-hub',
        clientId: 'frontend'
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CourseListComponent,
    CourseFormComponent,
    CourseEditComponent,
    UserRegisterComponent,
    ForbiddenComponent,
    AddCardComponent,
    PlanComponent,
    ViewPaymentComponent,
    UserSubscriptionComponent,
    SectionFormComponent,
    AddClassComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ButtonModule,
        TabMenuModule,
        MenubarModule,
        KeycloakAngularModule,
        DataViewModule,
        RouterModule,
        HttpClientModule,
        PaginatorModule,
        InputTextModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        InputTextareaModule,
        ToastModule,
        ConfirmPopupModule,
        CardModule,
        FileUploadModule,
        PasswordModule,
        DividerModule,
        FormsModule,
        TreeTableModule,
        DialogModule,
        StepsModule,
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },

    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
