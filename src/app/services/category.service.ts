import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../model/api-response";
import {CategoryDto} from "../model/dto/CategoryDto";
import {SubCategoryDto} from "../model/dto/SubCategoryDto";
import {CourseEnv} from "../environments/course";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_URL = `${CourseEnv.COURSE_URL}/api/v1/category`;
  http: HttpClient = inject(HttpClient)
  constructor() { }

  getAllCategories() {
    return this.http.get<ApiResponse<CategoryDto[]>>(  `${this.API_URL}/all`);
  }

  getSubCategoriesByCategoryId(categoryId: number) {
    return this.http.get<ApiResponse<SubCategoryDto[]>>(`${this.API_URL}/${categoryId}/subcategory`);
  }

}
