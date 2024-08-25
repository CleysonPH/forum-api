import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseInput {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseOutput {}

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answercommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseInput): Promise<DeleteAnswerCommentUseCaseOutput> {
    const answerComment =
      await this.answercommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Comment not found')
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answercommentsRepository.delete(answerComment)

    return {}
  }
}
