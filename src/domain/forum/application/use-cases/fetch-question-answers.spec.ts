import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Answers Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        createdAt: new Date(2022, 0, 20),
        questionId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        createdAt: new Date(2022, 0, 18),
        questionId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        createdAt: new Date(2022, 0, 23),
        questionId: new UniqueEntityID('1'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        createdAt: new Date(2022, 0, 23),
        questionId: new UniqueEntityID('2'),
      }),
    )

    const { answers } = await sut.execute({ page: 1, questionId: '1' })

    expect(answers).toHaveLength(3)
    expect(answers).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('1') }),
      )
    }

    const { answers } = await sut.execute({ page: 2, questionId: '1' })

    expect(answers).toHaveLength(2)
  })
})
