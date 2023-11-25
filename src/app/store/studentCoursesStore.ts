import {createStore, setProps, withProps} from "@ngneat/elf";
import {selectAllEntities, upsertEntities, withEntities} from "@ngneat/elf-entities";
import {Course} from "../model/Course";
import {Injectable} from "@angular/core";
import {Paginator} from "../model/paginator";

export interface StudentCourseProps {
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
const studentCoursesStore = createStore(
  { name: 'studentCourses' },
  withEntities<Course>(),
  withProps<StudentCourseProps>({totalElements: 0, totalPages: 0, currentPage: 0/*,filters: {}*/})
  );

@Injectable({ providedIn: 'root' })
export class StudentCoursesRepository {

  // @ts-ignore
  studentCourses$ = studentCoursesStore.pipe(selectAllEntities());

  getStudentCourseProps(){
    return studentCoursesStore.query((state) => state);
  }

  setCourses(response: Paginator<Course>) {
    studentCoursesStore.update(upsertEntities(response.content),
      setProps({
        currentPage: response.number,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
      })

    );
  }

}

