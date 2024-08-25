import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        createdAt: new Date(2022, 0, 20),
        questionId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        createdAt: new Date(2022, 0, 18),
        questionId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        createdAt: new Date(2022, 0, 23),
        questionId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        createdAt: new Date(2022, 0, 23),
        questionId: new UniqueEntityID('2'),
      }),
    )

    const { questionComments } = await sut.execute({ page: 1, questionId: '1' })

    expect(questionComments).toHaveLength(3)
    expect(questionComments).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID('1') }),
      )
    }

    const { questionComments } = await sut.execute({ page: 2, questionId: '1' })

    expect(questionComments).toHaveLength(2)
  })
})
