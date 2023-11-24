import {createStore, withProps, select, setProps} from '@ngneat/elf';
import {selectAllEntities, setEntities, updateEntities, upsertEntities, withEntities} from "@ngneat/elf-entities";
import {ApiResponse, Paginator} from "../model/paginator";
import {Injectable} from "@angular/core";
import {Course} from "../model/Course";

// export interface Course {
//   id: number;
//   title: string;
//   description: string;
//   amount: number;
//   duration: number;
//   languageId: number;
//   levelId: number;
//   subCategoryId: number;
//   logoUrl: string;
// }

export interface CourseProps {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  /*filters: {
    title?: string;
    languageId?: number;
    levelId?: number;
    categoryId?: number;
  };*/
}


// @ts-ignore

const courseStore = createStore(
  { name: 'courses' },
  withEntities<Course>(),
  withProps<CourseProps>({totalElements: 0, totalPages: 0, currentPage: 0/*,filters: {}*/})
);


@Injectable({ providedIn: 'root' })
export class CourseRepository {
  course$ = courseStore.pipe(selectAllEntities());

  getCourseProps(){
    return courseStore.query((state) => state);
  }

  setCourses(response: Paginator<Course>) {
    courseStore.update(upsertEntities(response.content),
      setProps({
        currentPage: response.number,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
      })

    );
  }

  addCourse(course: Course) {
    courseStore.update(upsertEntities(course));
  }

  /*
  setFilters(filters: CourseProps['filters']) {
    courseStore.update(setProps({ filters }));
  }

  getFilters() {
    return courseStore.query((state) => state.filters);
  }*/

}

