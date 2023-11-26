import {Course} from "./Course";

export interface CourseAndProgress extends Course{
  progressPercent: number;
}
