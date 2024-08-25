import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete QuestionComment Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const newQuestionComment = makeQuestionComment(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-comment-1'),
    )

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    await sut.execute({
      authorId: 'author-1',
      questionCommentId: 'question-comment-1',
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment from another author', async () => {
    const newQuestionComment = makeQuestionComment(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-comment-1'),
    )

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    await expect(
      sut.execute({
        authorId: 'wrong-author-id',
        questionCommentId: 'question-comment-1',
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)
  })

  it('should not be able to delete a question-comment with wrong id', async () => {
    await expect(
      sut.execute({
        authorId: 'author-1',
        questionCommentId: 'wrong-question-comment-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
