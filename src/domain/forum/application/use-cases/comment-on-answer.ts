import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface CommentOnAnswerUseCaseInput {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseOutput {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
  }: CommentOnAnswerUseCaseInput): Promise<CommentOnAnswerUseCaseOutput> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: answer.id,
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return { answerComment }
  }
}
