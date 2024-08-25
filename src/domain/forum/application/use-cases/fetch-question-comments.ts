import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseInput {
  questionId: string
  page: number
}

interface FetchQuestionCommentsUseCaseOutput {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseInput): Promise<FetchQuestionCommentsUseCaseOutput> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return { questionComments }
  }
}
