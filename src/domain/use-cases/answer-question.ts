import { Answer } from "../entities/answer"

interface AnswerQuestionUseCaseInput {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  execute({instructorId, questionId, content}: AnswerQuestionUseCaseInput) {
    const answer = new Answer(content)

    return answer
  }
}