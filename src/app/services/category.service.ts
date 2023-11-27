import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../model/api-response";
import {CategoryDto} from "../model/dto/CategoryDto";
import {SubCategoryDto} from "../model/dto/SubCategoryDto";
import {CourseEnv} from "../environments/course";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_URL = `${CourseEnv.COURSE_URL}/api/v1/category`;

  COURSE_URL = environment.COURSE_URL;
  http: HttpClient = inject(HttpClient)
  constructor() { }

  getAllCategories() {
    const URL = `${this.COURSE_URL}/api/v1/category/all`;
    return this.http.get<ApiResponse<CategoryDto[]>>(  URL);
  }

  getSubCategoriesByCategoryId(categoryId: number) {
    const URL = `${this.COURSE_URL}/api/v1/category/${categoryId}/subcategory`;
    return this.http.get<ApiResponse<SubCategoryDto[]>>(URL);
  }

}
