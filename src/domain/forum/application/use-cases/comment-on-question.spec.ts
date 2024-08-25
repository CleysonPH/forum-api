import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({}, new UniqueEntityID('question-1')),
    )

    await sut.execute({
      authorId: 'author-1',
      content: 'This is a test comment',
      questionId: 'question-1',
    })

    expect(inMemoryQuestionCommentsRepository.items[0]).toMatchObject({
      authorId: new UniqueEntityID('author-1'),
      questionId: new UniqueEntityID('question-1'),
      content: 'This is a test comment',
    })
  })

  it('should not be able to comment on question with wrong question id', async () => {
    await expect(
      sut.execute({
        authorId: 'author-1',
        content: 'This is a test comment',
        questionId: 'wrong-question-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
