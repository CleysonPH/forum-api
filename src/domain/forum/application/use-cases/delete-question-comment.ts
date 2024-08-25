import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseInput {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseOutput {}

export class DeleteQuestionCommentUseCase {
  constructor(
    private readonly questioncommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseInput): Promise<DeleteQuestionCommentUseCaseOutput> {
    const questionComment =
      await this.questioncommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Comment not found')
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.questioncommentsRepository.delete(questionComment)

    return {}
  }
}
