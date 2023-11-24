export interface QuestionDto{
    id: number;
    content: String;
    assignmentId: number;
    score: number;
    options: QuestionOptionDto[];

}

export interface QuestionOptionDto{
    id: number;
    option: String;
    isSelected?: boolean;
}
