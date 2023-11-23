import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent implements OnInit {
  items!: MenuItem[];

    constructor() {
      console.log("ClassFormComponent");
    }


    ngOnInit() {
        this.items = [
            {label: 'Add Class', icon: 'pi pi-fw pi-plus', routerLink: 'add-class'},
            {label: 'Add Video', icon: 'pi pi-fw pi-plus', routerLink: 'add-video'},
        ];
  }
}
