import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({}, new UniqueEntityID('answer-1')),
    )

    await sut.execute({
      authorId: 'author-1',
      content: 'This is a test comment',
      answerId: 'answer-1',
    })

    expect(inMemoryAnswerCommentsRepository.items[0]).toMatchObject({
      authorId: new UniqueEntityID('author-1'),
      answerId: new UniqueEntityID('answer-1'),
      content: 'This is a test comment',
    })
  })

  it('should not be able to comment on answer with wrong answer id', async () => {
    await expect(
      sut.execute({
        authorId: 'author-1',
        content: 'This is a test comment',
        answerId: 'wrong-answer-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
